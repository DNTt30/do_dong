/**
 * Breadcrumb — dynamic breadcrumb with JSON-LD schema.
 */

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import type { BreadcrumbItem } from '@/types/common.types';
import { generateBreadcrumbJsonLd } from '@/utils/seo';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems: BreadcrumbItem[] = [{ label: 'Trang chủ', href: '/' }, ...items];
  const jsonLd = generateBreadcrumbJsonLd(allItems);

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="py-3">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;

            return (
              <li key={index} className="flex items-center gap-1">
                {index === 0 && <Home size={14} className="shrink-0" />}

                {isLast ? (
                  <span className="text-foreground font-medium truncate max-w-[200px]">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href ?? '/'}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                )}

                {!isLast && (
                  <ChevronRight size={14} className="shrink-0 text-border" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
