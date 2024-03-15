import type { Metadata, Viewport } from 'next';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import { cn } from '@envi/ui';
import { ThemeProvider } from '@envi/ui/theme';
import { Toaster } from '@envi/ui/toast';

import '#/styles/globals.css';

import { Suspense } from 'react';

import { Analytics } from '@vercel/analytics/react';

import Footer from '#/components/layout/footer';
import Navbar from '#/components/layout/navbar';

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Matter x Envicrete',
  description:
    'Matter x Envicrete is redefining interior spaces with premium quality, highly-durable, eco-friendly surface materials with an aesthetic that matter.',
  robots: {
    follow: false,
    index: false,
  },
  openGraph: {
    title: 'Matter x Envicrete',
    description:
      'Matter x Envicrete is redefining interior spaces with premium quality, highly-durable, eco-friendly surface materials with an aesthetic that matter',
    url: 'https://matter.com.pk',
    siteName: 'Matter x Envicrete',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@envicrete',
    creator: '@envicrete',
  },
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
    {
      rel: 'apple',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      url: '/favicon-16x16.png',
      sizes: '16x16',
    },
    {
      rel: 'icon',
      url: '/favicon-32x32.png',
      sizes: '32x32',
    },
    {
      rel: 'icon',
      url: '/favicon-192x192.png',
      sizes: '192x192',
    },
    {
      rel: 'icon',
      url: '/android-chrome-512x512.png',
      sizes: '512x512',
    },
    {
      rel: 'mask-icon',
      url: '/safari-pinned-tab.svg',
    },
  ],
  manifest: `${baseUrl}/site.webmanifest`,
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E3E3E5' },
    { media: '(prefers-color-scheme: dark)', color: '#45454A' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'min-h-screen bg-background font-sans text-foreground antialiased',
        GeistSans.variable,
        GeistMono.variable,
      )}
    >
      <body className="dark: selection:bg-teal-300 dark:selection:bg-pink-500 dark:selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense>
            <Navbar />
          </Suspense>
          <Suspense>
            <main>{children}</main>
          </Suspense>
          <Suspense>
            <Footer />
          </Suspense>
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
