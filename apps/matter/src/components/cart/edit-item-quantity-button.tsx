'use client';

import type { CartItem } from '#/lib/shopify/types';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useFormState, useFormStatus } from 'react-dom';

import { cn } from '@envi/ui';

import { updateItemQuantity } from '#/components/cart/actions';
import LoadingDots from '#/components/loading-dots';

function SubmitButton({ type }: { type: 'plus' | 'minus' }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label={
        type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'
      }
      aria-disabled={pending}
      className={cn(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border hover:opacity-80',
        {
          'cursor-not-allowed': pending,
          'ml-auto': type === 'minus',
        },
      )}
    >
      {pending ? (
        <LoadingDots className="bg-foreground" />
      ) : type === 'plus' ? (
        <PlusIcon className="h-4 w-4" />
      ) : (
        <MinusIcon className="h-4 w-4" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
}: {
  item: CartItem;
  type: 'plus' | 'minus';
}) {
  const [message, formAction] = useFormState(updateItemQuantity, null);
  const payload = {
    lineId: item.id,
    variantId: item.merchandise.id,
    quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1,
  };
  const actionWithVariant = formAction.bind(null, payload);

  return (
    <form action={actionWithVariant}>
      <SubmitButton type={type} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
