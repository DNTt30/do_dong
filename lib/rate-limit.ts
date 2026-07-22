/**
 * Rate limiter — in-memory, per-IP.
 * Used for login attempts and contact form submissions.
 *
 * In production with multiple Vercel instances, replace with
 * Upstash Redis: https://upstash.com/docs/redis/sdks/ratelimit-ts/overview
 */

interface RateLimitEntry {
  count: number;
  firstAttempt: number;
  lockedUntil?: number;
}

// In-memory store (works for single-instance dev/single-server prod)
const store = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now - entry.firstAttempt > 60 * 60 * 1000) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitOptions {
  /** Max allowed attempts within the window */
  maxAttempts: number;
  /** Window duration in milliseconds */
  windowMs: number;
  /** Lockout duration in milliseconds after maxAttempts exceeded */
  lockoutMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
}

/**
 * Check if an action is rate-limited for the given identifier (IP, email, etc.).
 * Call this BEFORE processing the action.
 */
export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions
): RateLimitResult {
  const now = Date.now();
  const key = identifier.toLowerCase().trim();
  const entry = store.get(key);

  // No entry yet — first attempt
  if (!entry) {
    store.set(key, { count: 1, firstAttempt: now });
    return { allowed: true, remaining: options.maxAttempts - 1, retryAfterMs: 0 };
  }

  // Locked out?
  if (entry.lockedUntil && now < entry.lockedUntil) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: entry.lockedUntil - now,
    };
  }

  // Window expired — reset
  if (now - entry.firstAttempt > options.windowMs) {
    store.set(key, { count: 1, firstAttempt: now });
    return { allowed: true, remaining: options.maxAttempts - 1, retryAfterMs: 0 };
  }

  // Within window — increment
  entry.count += 1;

  if (entry.count > options.maxAttempts) {
    entry.lockedUntil = now + options.lockoutMs;
    store.set(key, entry);
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: options.lockoutMs,
    };
  }

  store.set(key, entry);
  return {
    allowed: true,
    remaining: options.maxAttempts - entry.count,
    retryAfterMs: 0,
  };
}

/** Reset rate limit for a key (e.g., after successful login) */
export function resetRateLimit(identifier: string): void {
  store.delete(identifier.toLowerCase().trim());
}

// ── Pre-configured limiters ───────────────────────────────────────────────────

/** Login: 5 attempts per 5 minutes, 30-second lockout */
export const LOGIN_RATE_LIMIT: RateLimitOptions = {
  maxAttempts: 5,
  windowMs: 5 * 60 * 1000,    // 5 minutes
  lockoutMs: 30 * 1000,        // 30 seconds
};

/** Contact form: 3 submissions per 10 minutes */
export const CONTACT_RATE_LIMIT: RateLimitOptions = {
  maxAttempts: 3,
  windowMs: 10 * 60 * 1000,   // 10 minutes
  lockoutMs: 5 * 60 * 1000,   // 5 minutes
};

/** General API: 100 requests per minute */
export const API_RATE_LIMIT: RateLimitOptions = {
  maxAttempts: 100,
  windowMs: 60 * 1000,
  lockoutMs: 60 * 1000,
};
