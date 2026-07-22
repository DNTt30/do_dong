import type { Metadata } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/providers/AppProviders';
import { SEO_DEFAULTS } from '@/constants/seo.constants';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
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

import FloatingContact from '@/components/layout/FloatingContact';
import Analytics from '@/components/common/Analytics';
import { generateOrganizationJsonLd } from '@/utils/seo';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = generateOrganizationJsonLd();

  return (
    <html lang="vi" className={`${outfit.variable} ${playfairDisplay.variable}`}>
      <body className="font-sans text-foreground bg-background antialiased">
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <AppProviders>
          {children}
          <FloatingContact />
        </AppProviders>
      </body>
    </html>
  );
}
