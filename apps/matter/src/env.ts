import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  shared: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    VERCEL_ENV: z.enum(['development', 'preview', 'production']).optional(),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    AUTH_DISCORD_ID: z.string(),
    AUTH_DISCORD_SECRET: z.string(),
    AUTH_SECRET: z.string(),
    BYTESCALE_ACCOUNT_ID: z.string(),
    BYTESCALE_SECRET_API_KEY: z.string(),
    COMPANY_NAME: z.string(),
    DB_HOST: z.string(),
    DB_NAME: z.string(),
    DB_PASSWORD: z.string(),
    DB_USERNAME: z.string(),
    REPLICATE_API_KEY: z.string(),
    SHOPIFY_REVALIDATION_SECRET: z.string(),
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string(),
    SHOPIFY_STORE_DOMAIN: z.string(),
    SHORT_SITE_NAME: z.string(),
    SITE_NAME: z.string(),
    TURBO_TEAM: z.string(),
    TURBO_TOKEN: z.string(),
    TWITTER_CREATOR: z.string(),
    TWITTER_SITE: z.string(),
    UPSTASH_REDIS_REST_TOKEN: z.string(),
    UPSTASH_REDIS_REST_URL: z.string(),
  },
  client: {
    NEXT_PUBLIC_UPLOAD_API_KEY: z.string(),
  },

  runtimeEnv: {
    AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
    AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
    BYTESCALE_ACCOUNT_ID: process.env.BYTESCALE_ACCOUNT_ID,
    BYTESCALE_SECRET_API_KEY: process.env.BYTESCALE_SECRET_API_KEY,
    COMPANY_NAME: process.env.COMPANY_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USERNAME: process.env.DB_USERNAME,
    NEXT_PUBLIC_UPLOAD_API_KEY: process.env.NEXT_PUBLIC_UPLOAD_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
    REPLICATE_API_KEY: process.env.REPLICATE_API_KEY,
    SHOPIFY_REVALIDATION_SECRET: process.env.SHOPIFY_REVALIDATION_SECRET,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN:
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    SHORT_SITE_NAME: process.env.SHORT_SITE_NAME,
    SITE_NAME: process.env.SITE_NAME,
    TURBO_TEAM: process.env.TURBO_TEAM,
    TURBO_TOKEN: process.env.TURBO_TOKEN,
    TWITTER_CREATOR: process.env.TWITTER_CREATOR,
    TWITTER_SITE: process.env.TWITTER_SITE,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    VERCEL_ENV: process.env.VERCEL_ENV,

    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === 'lint',
});
