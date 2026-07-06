/**
 * Site settings TypeScript types.
 */

/** Full site settings model matching Firestore 'settings' document */
export interface SiteSettings {
  companyName: string;
  tagline?: string;
  phone: string;
  phoneAlt?: string;
  email: string;
  address: string;
  facebook?: string;
  zalo?: string;
  zaloPhone?: string;
  messengerUrl?: string;
  youtube?: string;
  googleMapUrl?: string;
  googleMapEmbed?: string;
  logo?: string;
  logoPath?: string;
  favicon?: string;
  faviconPath?: string;
  aboutText?: string;
  workingHours?: string;
}

/** Partial settings for update operations */
export type SettingsUpdateData = Partial<SiteSettings>;
