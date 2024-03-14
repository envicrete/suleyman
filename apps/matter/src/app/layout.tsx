import type { Metadata, Viewport } from 'next';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import { cn } from '@envi/ui';
import { ThemeProvider } from '@envi/ui/theme';
import { Toaster } from '@envi/ui/toast';

import { env } from '#/env';

import '#/styles/globals.css';

import { Suspense } from 'react';

import { Analytics } from '@vercel/analytics/react';

import Footer from '#/components/layout/footer';
import Navbar from '#/components/layout/navbar';

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === 'production'
      ? 'https://matter.com.pk'
      : 'http://localhost:3000',
  ),
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
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
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
