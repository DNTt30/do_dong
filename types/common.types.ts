/**
 * Common shared types used across the application.
 */

/** Generic paginated result from Supabase */
export interface PaginatedResult<T> {
  items: T[];
  hasNextPage: boolean;
  page: number;
  total: number;
}

/** Generic API response wrapper */
export interface ApiResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

/** SEO metadata for pages */
export interface SEOMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

/** Navigation menu item */
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/** Breadcrumb item */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** Sort direction */
export type SortDirection = 'asc' | 'desc';

/** Generic filter */
export interface FilterOptions {
  field: string;
  operator: 'eq' | 'neq' | 'lt' | 'lte' | 'gt' | 'gte' | 'in' | 'contains';
  value: unknown;
}

