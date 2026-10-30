import type { Metadata } from 'next';
import ApplicationWizard from '@/components/ApplicationWizard';
export const metadata: Metadata = { title: 'Business loan application', description: 'Share the outline of your business and financing goals with Aurevian Capital. Applying is free and does not guarantee funding.' };
export default function LoanApplicationPage() { return <ApplicationWizard kind="loan"/>; }
