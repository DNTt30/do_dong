/**
 * Blog post-related TypeScript types.
 */



/** Full blog post model matching Firestore schema */
export interface Blog {
  id: string;
  title: string;
  slug: string;
  thumbnail?: string;
  thumbnailPath?: string; // Storage path for deletion
  content: string;        // HTML string from TipTap editor
  excerpt?: string;       // Auto-generated short description
  seoTitle?: string;
  seoDescription?: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Form data for creating/updating a blog post */
export interface BlogFormData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  seoTitle?: string;
  seoDescription?: string;
  author: string;
  published: boolean;
}

/** Minimal blog data for cards/lists */
export type BlogCard = Pick<
  Blog,
  'id' | 'title' | 'slug' | 'thumbnail' | 'excerpt' | 'author' | 'createdAt'
>;
