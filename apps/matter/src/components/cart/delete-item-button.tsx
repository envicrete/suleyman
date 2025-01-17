'use client';

import type { CartItem } from '#/lib/shopify/types';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFormState, useFormStatus } from 'react-dom';

import { cn } from '@envi/ui';

import { removeItem } from '#/components/cart/actions';
import LoadingDots from '#/components/loading-dots';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Remove cart item"
      aria-disabled={pending}
      className={cn(
        'ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-alternate transition-all duration-200',
        {
          'cursor-not-allowed px-0': pending,
        },
      )}
    >
      {pending ? (
        <LoadingDots className="bg-white" />
      ) : (
        <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white" />
      )}
    </button>
  );
}

export function DeleteItemButton({ item }: { item: CartItem }) {
  const [message, formAction] = useFormState(removeItem, null);
  const itemId = item.id;
  const actionWithVariant = formAction.bind(null, itemId);

  return (
    <form action={actionWithVariant}>
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
