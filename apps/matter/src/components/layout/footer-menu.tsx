'use client';

import type { Menu } from '#/lib/shopify/types';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@envi/ui';

const FooterMenuItem = ({ item }: { item: Menu }) => {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li>
      <Link
        href={item.path}
        className={cn(
          'block p-2 text-lg underline-offset-4 hover:text-primary hover:underline md:inline-block md:text-sm',
          {
            'font-bold text-foreground underline underline-offset-4': active,
          },
        )}
      >
        {item.title}
      </Link>
    </li>
  );
};

export default function FooterMenu({ menu }: { menu: Menu[] }) {
  if (!menu.length) return null;

  const chunkSize = 4;
  const menuChunks = [];
  for (let i = 0; i < menu.length; i += chunkSize) {
    menuChunks.push(menu.slice(i, i + chunkSize));
  }

  return (
    <nav className="md:grid md:grid-cols-3 md:gap-4 md:gap-x-16">
      {menuChunks.map((chunk, index) => (
        <ul key={index} className="list-none p-0">
          {chunk.map((item: Menu) => (
            <FooterMenuItem key={item.title} item={item} />
          ))}
        </ul>
      ))}
    </nav>
  );
}
