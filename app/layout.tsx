import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/providers/AppProviders';
import { SEO_DEFAULTS } from '@/constants/seo.constants';

const inter = Inter({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO_DEFAULTS.siteUrl),
  title: {
    default: SEO_DEFAULTS.defaultTitle,
    template: `%s | ${SEO_DEFAULTS.siteName}`,
  },
  description: SEO_DEFAULTS.defaultDescription,
  keywords: [...SEO_DEFAULTS.defaultKeywords],
  authors: [{ name: SEO_DEFAULTS.siteName }],
  creator: SEO_DEFAULTS.siteName,
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: SEO_DEFAULTS.siteName,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="font-sans text-foreground bg-background antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
