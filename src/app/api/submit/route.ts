import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

function makeReference(kind: string) {
  const n = Math.floor(1000 + Math.random() * 9000);
  const letters = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `AC-${kind === 'loan' ? 'L' : 'E'}-${letters}${n}`;
}

const NEVER = /(ssn|social insurance|sin number|date of birth|dateofbirth|\bdob\b|passport|driver's licen[cs]e|id number)/i;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const kind = body.kind === 'equity' ? 'equity' : 'loan';
    const email = String(body.data?.email || '').trim().toLowerCase();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }
    const flat = JSON.stringify(body.data).toLowerCase();
    if (NEVER.test(flat)) {
      return NextResponse.json({ error: 'This form must not collect identity numbers or dates of birth.' }, { status: 400 });
    }
    const reference = makeReference(kind);
    const { error } = await supabaseAdmin().from('applications').insert({
      reference,
      kind,
      status: 'submitted',
      email,
      data: body.data,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true, reference });
  } catch (error) {
    console.error('submit failed:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Could not save your application. Please try again.' }, { status: 500 });
  }
}
