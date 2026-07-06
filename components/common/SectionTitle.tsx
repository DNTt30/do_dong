/**
 * SectionTitle — animated heading component for all page sections.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  label?: string;      // Small category label above heading
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;     // Light variant for dark backgrounds
  className?: string;
}

export default function SectionTitle({
  label,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}: SectionTitleProps) {
  const alignClass = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }[align];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn('flex flex-col gap-3', alignClass, className)}
    >
      {label && (
        <span
          className={cn(
            'inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]',
            light ? 'text-secondary' : 'text-secondary'
          )}
        >
          <span className="w-6 h-[2px] bg-secondary rounded-full" />
          {label}
          <span className="w-6 h-[2px] bg-secondary rounded-full" />
        </span>
      )}

      <h2
        className={cn(
          'section-heading',
          light ? 'text-white' : 'text-foreground'
        )}
      >
        {title}
      </h2>

      {/* Gold accent line */}
      <div
        className={cn(
          'h-[3px] w-16 rounded-full bg-gradient-gold',
          align === 'center' && 'mx-auto',
          align === 'right' && 'ml-auto'
        )}
      />

      {subtitle && (
        <p
          className={cn(
            'text-base max-w-2xl leading-relaxed',
            light ? 'text-primary-100' : 'text-muted-foreground'
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
