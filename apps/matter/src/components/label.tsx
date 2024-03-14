import { cn } from '@envi/ui';

import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
  position = 'bottom',
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label',
        {
          'lg:px-20 lg:pb-[35%]': position === 'center',
        },
      )}
    >
      <div className="flex items-center rounded-full bg-alternate/70 p-1 text-xs font-bold text-white backdrop-blur-md">
        <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
          {title}
        </h3>
        <Price
          className="flex-none rounded-full bg-primary px-2 py-1 font-bold text-white"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
