import type { Metadata } from 'next';
import ApplicationWizard from '@/components/ApplicationWizard';
export const metadata: Metadata = { title: 'Equity opportunity inquiry', description: 'Share your business overview and investment goals with Aurevian Capital. Applying is free and does not guarantee investment.' };
export default function EquityApplicationPage() { return <ApplicationWizard kind="equity"/>; }
