import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Privacy notice', description: 'How Aurevian Capital handles the information shared through its application portal.' };
export default function PrivacyPage() {
  return <><section className="page-hero"><div className="wrap"><p className="eyebrow">Privacy notice</p><h1 style={{maxWidth:850,marginTop:16}}>How we handle your information.</h1></div></section><Body/></>;
}


function Body() {
  return <section className="section"><div className="wrap page-content">
    <p>This notice explains what information Aurevian Capital asks for, why we ask for it, and how it is used. It applies to information submitted through this website.</p>
    <h2>What we ask for</h2>
    <p>Application forms ask for basic business details: your legal business name, trading name, website, industry, country of registration, years operating, contact details, and the amount and purpose of the funding or investment you are exploring. Loan applications also ask for annual revenue and employee count. Equity inquiries also ask about your fundraising stage and use of funds.</p>
    <p>We do not ask for Social Security numbers, Social Insurance Numbers, dates of birth, government-issued identification images, or bank login credentials on this website, and we will never ask you to provide them through this portal. If you are ever asked for these through a channel claiming to be Aurevian Capital, please treat it as suspicious and contact us.</p>
    <h2>Why we ask</h2>
    <p>Information you submit is used to review your inquiry, follow up with questions, and explain possible next steps. Applying is free, and submitting an application does not guarantee financing or investment.</p>
    <h2>Marketing communications</h2>
    <p>You may choose to receive occasional updates from Aurevian Capital. This choice is optional, presented separately from the application itself, and is not required to submit an inquiry. You can withdraw consent at any time by contacting us.</p>
    <h2>Sharing</h2>
    <p>We do not sell your information. Information is shared only with team members involved in reviewing your inquiry, and with service providers who help us operate this website, under obligations to protect it.</p>
    <h2>Retention</h2>
    <p>We keep application information for as long as needed to review your inquiry and for a reasonable period afterwards, or as required by law. You may ask us to correct or delete information we hold about you by contacting hello@aureviancapital.com.</p>
    <h2>Contact</h2>
    <p>Questions about this notice can be sent to hello@aureviancapital.com. Please do not send sensitive personal or financial credentials by email.</p>
    <p><em>This is a plain-language summary intended to be read alongside any formal privacy policy adopted by Aurevian Capital.</em></p>
  </div></section>;
}

