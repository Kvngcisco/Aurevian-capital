import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#1B4332' };
export const metadata: Metadata = { metadataBase: new URL('https://aureviancapital.com'), title: { default: 'Aurevian Capital | Funding for ambitious businesses', template: '%s | Aurevian Capital' }, description: 'Thoughtful capital for businesses building what comes next. Explore financing and equity opportunities with Aurevian Capital.', openGraph: { title: 'Aurevian Capital', description: 'Capital for what comes next.', type: 'website' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/></body></html> }
