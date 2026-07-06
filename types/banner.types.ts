/**
 * Banner-related TypeScript types.
 */



/** Display position of the banner */
export type BannerPosition = 'hero' | 'sidebar' | 'popup';

/** Full banner model matching Firestore schema */
export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  imagePath?: string; // Storage path for deletion
  linkUrl?: string;
  buttonText?: string;
  position: BannerPosition;
  order: number;
  active: boolean;
  createdAt: string;
}

/** Form data for creating/updating a banner */
export interface BannerFormData {
  title: string;
  subtitle?: string;
  description?: string;
  linkUrl?: string;
  buttonText?: string;
  position: BannerPosition;
  order: number;
  active: boolean;
}
