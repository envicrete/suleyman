import { Suspense } from 'react';
import Link from 'next/link';

import { ThemeToggle } from '@envi/ui/theme';

import FooterMenu from '#/components/layout/footer-menu';
import LogoSquare from '#/components/logo-square';
import { getMenu } from '#/lib/shopify';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton =
    'w-full h-6 animate-pulse rounded bg-muted dark:bg-neutral-700';
  const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = COMPANY_NAME ?? SITE_NAME ?? '';

  return (
    <footer className="text-sm text-muted-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <div>
          <Link
            className="flex items-center gap-2 text-secondary-foreground md:pt-1"
            href="/"
          >
            <LogoSquare size="sm" />
            <span className="uppercase">{SITE_NAME}</span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>
        <div className="md:ml-auto">
          <ThemeToggle />
        </div>
      </div>
      <div className="border-t py-6 text-xs">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 text-secondary-foreground md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.')
              ? '.'
              : ''}{' '}
            All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-primary md:inline-block" />
          <p>Designed in Karachi</p>
          <p className="md:ml-auto">
            Hand crafted by{' '}
            <a
              href="https://sambi.dev"
              className="text-xs font-semibold text-primary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the site of sambi.dev in a new window. The folks who built this site."
            >
              sambi.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
