import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = { title: 'Funding options explained', description: 'A plain-language comparison of business funding routes: term loans, lines of credit, revenue-based funding and equity.' };
export default function Page() {
  return <>
  <section className="page-hero"><div className="wrap"><p className="eyebrow">Funding options</p><h1 style={{maxWidth:850,marginTop:16}}>Know the routes before you choose one.</h1><p className="lead">A high-level comparison of the common ways businesses raise capital. Aurevian currently reviews loan inquiries and equity opportunities; the other routes are here for context.</p></div></section>
  <section className="section"><div className="wrap page-content">
    <div className="card-grid">
      <article className="card"><h3>Term loan</h3><p className="muted">A fixed amount borrowed upfront and repaid over a set period with interest. Suits planned, one-time investments like equipment or expansion. Aurevian accepts loan inquiries through its application.</p></article>
      <article className="card"><h3>Line of credit</h3><p className="muted">Access to a set limit you draw from as needed, paying interest only on what you use. Suits working capital and uneven cash flow. Educational reference; not currently offered through Aurevian.</p></article>
      <article className="card"><h3>Revenue-based funding</h3><p className="muted">Capital repaid as a percentage of future revenue, so payments flex with sales. Common for seasonal or fast-moving businesses. Educational reference; not currently offered through Aurevian.</p></article>
      <article className="card"><h3>Equity investment</h3><p className="muted">Capital in exchange for an ownership stake, with no repayment obligation but shared ownership and dilution. Aurevian reviews equity opportunities through a separate inquiry.</p></article>
    </div>
    <p className="muted" style={{marginTop:28}}>This page is educational and does not describe terms Aurevian offers. Any actual terms are set per opportunity after review and documented in writing.</p>
  </div></section>
  <section className="section-sm"><div className="wrap"><div className="cta-band"><div className="eyebrow">A considered next step</div><h2 style={{marginTop:16}}>Ready when you are.</h2><div style={{display:'flex',gap:14,flexWrap:'wrap',marginTop:14}}><Link className="button button-invert" href="/apply/loan">Start a loan inquiry</Link><Link className="button button-invert" href="/apply/equity">Submit an equity inquiry</Link></div></div></div></section>
  </>;
}
