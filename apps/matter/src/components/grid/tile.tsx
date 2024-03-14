import Image from 'next/image';

import { cn } from '@envi/ui';

import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={cn(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-primary hover:border-secondary-foreground',
        {
          relative: label,
          'border-2 border-secondary-foreground': active,
          border: !active,
        },
      )}
    >
      {props.src ? (
        <Image
          className={cn('relative h-full w-full object-fill', {
            'transition duration-300 ease-in-out group-hover:scale-105':
              isInteractive,
          })}
          {...props}
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
