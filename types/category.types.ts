/**
 * Category-related TypeScript types.
 */



/** Full category model matching Firestore schema */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  imagePath?: string; // Storage path for deletion
  productCount?: number; // Denormalized count
  createdAt: string;
}

/** Form data for creating/updating a category */
export interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
}

/** Minimal category for dropdowns/selects */
export type CategoryOption = Pick<Category, 'id' | 'name' | 'slug'>;
