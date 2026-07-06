/**
 * useBanners hook — fetches hero banners from Firestore.
 */

'use client';

import { useState, useEffect } from 'react';
import { getBanners } from '@/services/banner.service';
import type { Banner, BannerPosition } from '@/types/banner.types';

interface UseBannersReturn {
  banners: Banner[];
  isLoading: boolean;
}

export function useBanners(position?: BannerPosition): UseBannersReturn {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBanners(position)
      .then(setBanners)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [position]);

  return { banners, isLoading };
}
