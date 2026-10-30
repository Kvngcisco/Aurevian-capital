'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

type Row = { reference: string; kind: string; status: string; created_at: string };

export default function PortalPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState('');
  let supabase: ReturnType<typeof createClient> | null = null;
  const getClient = () => (supabase ??= createClient(SUPABASE_URL, SUPABASE_KEY));

  useEffect(() => {
    if (!SUPABASE_URL || !SUPABASE_KEY) return;
    getClient().auth.getSession().then(({ data }) => {
      const email = data.session?.user?.email;
      if (email) { setEmail(email); setSent(true); load(email); }
    });
    const { data: sub } = getClient().auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') getClient().auth.getSession().then(({ data }) => {
        const email = data.session?.user?.email;
        if (email) { setSent(true); load(email); }
      });
    });
    return () => { sub.subscription.unsubscribe(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load(email: string) {
    const res = await fetch('/api/portal-applications', { method: 'POST', body: JSON.stringify({ email }), headers: { 'content-type': 'application/json' } });
    const json = await res.json();
    if (res.ok) setRows(json.applications); else setError(json.error || 'Could not load');
  }

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const { error } = await getClient().auth.signInWithOtp({ email });
    if (error) setError(error.message); else setSent(true);
  }

  return <>
  <section className="page-hero"><div className="wrap">
    <p className="eyebrow">Applicant portal</p>
    <h1 style={{maxWidth:850,marginTop:16}}>Track your application.</h1>
    <p className="lead">Enter the email you applied with and we will send you a secure sign-in link. No passwords.</p>
  </div></section>
  <section className="section"><div className="wrap page-content" style={{maxWidth:640}}>
    {!sent && <form onSubmit={sendLink} className="card" style={{display:'grid',gap:14}}>
      <label className="field-label" htmlFor="portal-email">Work email</label>
      <input id="portal-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
      <button className="button" type="submit">Email me a sign-in link</button>
    </form>}
    {sent && !rows && <div className="card"><p style={{margin:0}}>Check {email} for the sign-in link. It may take a minute to arrive.</p></div>}
    {error && <p className="field-error" style={{marginTop:12}}>{error}</p>}
    {rows && rows.length > 0 && <div style={{display:'grid',gap:14}}>
      {rows.map((r) => <div className="card" key={r.reference}>
        <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8,alignItems:'baseline'}}>
          <h3 style={{margin:0}}>{r.kind === 'loan' ? 'Business funding' : 'Equity opportunity'}</h3>
          <span className="badge">{r.status}</span>
        </div>
        <p className="muted" style={{margin:'8px 0 0'}}>Reference {r.reference} · submitted {new Date(r.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</p>
      </div>)}
    </div>}
    {rows && rows.length === 0 && <div className="card"><p style={{margin:0}}>No applications found for this email yet. <Link href="/apply">Start one here</Link>.</p></div>}
  </div></section></>;
}
