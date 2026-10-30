import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const clean = String(email || '').trim().toLowerCase();
    if (!clean || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin()
      .from('applications')
      .select('reference, kind, status, created_at')
      .eq('email', clean)
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return NextResponse.json({ applications: data });
  } catch (error) {
    console.error('portal lookup failed:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Could not load applications' }, { status: 500 });
  }
}
