import { cn } from '@envi/ui';

const Price = ({
  amount,
  className,
  currencyCode = 'USD',
  currencyCodeClassName,
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(amount))}`}
    <span className={cn('ml-1 inline', currencyCodeClassName)} />
  </p>
);

export default Price;
