import type { Menu } from '#/lib/shopify/types';

import { Suspense } from 'react';
import Link from 'next/link';

import Cart from '#/components/cart';
import OpenCart from '#/components/cart/open-cart';
import LogoSquare from '#/components/logo-square';
import { getMenu } from '#/lib/shopify';

import MobileMenu from './mobile-menu';
import Search from './search';

const { SHORT_SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
            <div className="ml-2 flex-none font-bold text-primary md:hidden lg:block">
              {SHORT_SITE_NAME}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-4 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-muted-foreground underline-offset-4 hover:text-muted-foreground/80 hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>
        <div className="flex justify-end md:w-1/3">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
