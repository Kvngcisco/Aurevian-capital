import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Terms of use', description: 'Terms governing the use of the Aurevian Capital website and application portal.' };
export default function TermsPage() {
  return <><section className="page-hero"><div className="wrap"><p className="eyebrow">Terms of use</p><h1 style={{maxWidth:850,marginTop:16}}>The ground rules for this website.</h1></div></section>
  <section className="section"><div className="wrap page-content">
    <p>These terms govern your use of this website. By using the site or submitting an application, you accept them.</p>
    <h2>No offer of financing or investment</h2>
    <p>Nothing on this website is an offer of financing, an offer of investment, or a commitment to provide capital. All inquiries are subject to review, eligibility, due diligence and definitive documentation. Applying is free, and a submission does not guarantee any outcome.</p>
    <h2>Accuracy of information</h2>
    <p>You confirm that information you submit is accurate to the best of your knowledge. We may follow up to verify details before discussing next steps.</p>
    <h2>Acceptable use</h2>
    <p>You agree not to submit false, misleading or unlawful material, not to submit information about other individuals without their consent, and not to interfere with the operation of the website.</p>
    <h2>Intellectual property</h2>
    <p>The content, design and branding of this website belong to Aurevian Capital and may not be reproduced without permission.</p>
    <h2>Limitation of liability</h2>
    <p>This website is provided as-is. To the extent permitted by law, Aurevian Capital is not liable for indirect or consequential losses arising from use of this website.</p>
    <h2>Changes</h2>
    <p>We may update these terms from time to time. The current version is always the one published on this page.</p>
    <h2>Contact</h2>
    <p>Questions about these terms can be sent to hello@aureviancapital.com.</p>
    <p><em>These are plain-language terms intended to be read alongside any formal terms of service adopted by Aurevian Capital.</em></p>
  </div></section></>;
}
