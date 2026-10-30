import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Funding glossary', description: 'Plain-language definitions of common funding terms: principal, fees, repayment, dilution and risk.' };
const terms: Array<[string, string]> = [
  ['Principal', 'The original amount of funding you receive or request, before any fees or interest.'],
  ['Interest', 'The cost of borrowing money, usually a percentage of the principal, paid to the provider over time.'],
  ['Fees', 'Charges on top of the principal, such as an origination or service fee. Always ask whether a fee is one-time or recurring.'],
  ['Repayment schedule', 'How and when money is paid back: fixed instalments, a draw-and-repay limit, or a share of revenue.'],
  ['Collateral', 'Assets pledged as security for borrowed money. If a loan is secured and payments stop, those assets can be at risk.'],
  ['Dilution', 'When new shares are issued to an investor, existing owners hold a smaller percentage of the company.'],
  ['Valuation', 'The value of a business used to work out how much of it an investment buys.'],
  ['Due diligence', 'The review an investor or lender performs before committing capital, covering financials, operations and plans.'],
  ['Risk', 'Funding decisions are never certain. Investment can lose value, and borrowing must be repaid regardless of how the business performs.'],
];
export default function Page() {
  return <>
  <section className="page-hero"><div className="wrap"><p className="eyebrow">Glossary</p><h1 style={{maxWidth:850,marginTop:16}}>Plain words for funding terms.</h1><p className="lead">Actual terms for any Aurevian opportunity are set per deal after review. These definitions are general context, not an offer.</p></div></section>
  <section className="section"><div className="wrap page-content">
    {terms.map(([t, d]) => <div className="faq-item" key={t}><h3>{t}</h3><p className="muted" style={{margin:0}}>{d}</p></div>)}
  </div></section></>;
}
