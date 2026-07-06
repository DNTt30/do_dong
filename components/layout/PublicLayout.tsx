/**
 * Public layout — wraps all public pages with Header and Footer.
 */

import React, { type ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactButtons from '@/components/common/ContactButtons';
import BackToTop from '@/components/common/BackToTop';

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ContactButtons />
      <BackToTop />
    </div>
  );
}
