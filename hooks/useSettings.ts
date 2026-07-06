/**
 * useSettings hook — fetches and caches site settings from Firestore.
 */

'use client';

import { useState, useEffect } from 'react';
import { getSettings } from '@/services/settings.service';
import type { SiteSettings } from '@/types/settings.types';

interface UseSettingsReturn {
  settings: SiteSettings | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Module-level cache to avoid repeated Firestore reads during the same session
let cachedSettings: SiteSettings | null = null;

export function useSettings(): UseSettingsReturn {
  const [settings, setSettings] = useState<SiteSettings | null>(cachedSettings);
  const [isLoading, setIsLoading] = useState<boolean>(!cachedSettings);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getSettings();
      cachedSettings = data;
      setSettings(data);
    } catch (err) {
      setError('Không thể tải cài đặt website');
      console.error('useSettings error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!cachedSettings) {
      fetchSettings();
    }
  }, []);

  return { settings, isLoading, error, refetch: fetchSettings };
}
