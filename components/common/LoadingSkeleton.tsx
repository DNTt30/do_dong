/**
 * LoadingSkeleton — reusable skeleton loading placeholders.
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

/** Generic skeleton block */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('skeleton rounded-md bg-muted', className)} />
  );
}

/** Product card skeleton */
export function ProductCardSkeleton() {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Skeleton className="h-64 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
      </div>
    </div>
  );
}

/** Product grid skeleton */
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Blog card skeleton */
export function BlogCardSkeleton() {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}

/** Banner skeleton */
export function BannerSkeleton() {
  return <Skeleton className="h-[500px] w-full rounded-none" />;
}
