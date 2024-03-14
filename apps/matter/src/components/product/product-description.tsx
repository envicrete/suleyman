import type { Product } from '#/lib/shopify/types';

import { AddToCart } from '#/components/cart/add-to-cart';
import Price from '#/components/price';
import Prose from '#/components/prose';

import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6">
        <h1 className="mb-2 text-4xl font-semibold tracking-tighter">
          {product.title}
        </h1>
        <div className="mr-auto w-auto rounded-full bg-primary px-2 py-1 text-sm font-bold text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />

      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight"
          html={product.descriptionHtml}
        />
      ) : null}

      <AddToCart
        variants={product.variants}
        availableForSale={product.availableForSale}
      />
    </>
  );
}
