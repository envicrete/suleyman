import { cn } from '@envi/ui';

import LogoIcon from './icons/logo';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div
      className={cn(
        'flex flex-none items-center justify-center border bg-muted',
        {
          'h-[40px] w-[40px] rounded-xl': !size,
          'h-[30px] w-[30px] rounded-lg': size === 'sm',
        },
      )}
    >
      <LogoIcon
        className={cn({
          'h-[28px] w-[28px]': !size,
          'h-[20px] w-[20px]': size === 'sm',
        })}
      />
    </div>
  );
}
