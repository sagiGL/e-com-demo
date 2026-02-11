/**
 * Simple in-memory rate limiter (no external dependencies).
 * Sufficient for demo/dev use. Resets on server restart.
 */

type RateLimitEntry = { count: number; resetAt: number };

function createRateLimiter(maxRequests: number, windowMs: number) {
  const store = new Map<string, RateLimitEntry>();

  return {
    async limit(key: string) {
      const now = Date.now();
      const entry = store.get(key);

      if (!entry || now > entry.resetAt) {
        store.set(key, { count: 1, resetAt: now + windowMs });
        return { success: true };
      }

      if (entry.count >= maxRequests) {
        return { success: false };
      }

      entry.count++;
      return { success: true };
    },
  };
}

// 5 sign-in attempts per 15 minutes
export const authRateLimit = createRateLimiter(5, 15 * 60 * 1000);

// 1 sign-up per 15 minutes per IP
export const signUpRateLimit = createRateLimiter(1, 15 * 60 * 1000);
