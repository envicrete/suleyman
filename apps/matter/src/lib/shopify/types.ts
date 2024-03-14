export type Maybe<T> = T | null;

export interface Connection<T> {
  edges: Edge<T>[];
}

export interface Edge<T> {
  node: T;
}

export type Cart = Omit<ShopifyCart, 'lines'> & {
  lines: CartItem[];
};

export interface CartItem {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Product;
  };
}

export type Collection = ShopifyCollection & {
  path: string;
};

export interface Image {
  url: string;
  altText: string;
  width: number;
  height: number;
}

export interface Menu {
  title: string;
  path: string;
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Page {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
}

export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
  variants: ProductVariant[];
  images: Image[];
};

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
}

export interface SEO {
  title: string;
  description: string;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
}

export interface ShopifyCollection {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
}

export interface ShopifyCartOperation {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
}

export interface ShopifyCreateCartOperation {
  data: { cartCreate: { cart: ShopifyCart } };
}

export interface ShopifyAddToCartOperation {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
}

export interface ShopifyRemoveFromCartOperation {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
}

export interface ShopifyUpdateCartOperation {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
}

export interface ShopifyCollectionOperation {
  data: {
    collection: ShopifyCollection;
  };
  variables: {
    handle: string;
  };
}

export interface ShopifyCollectionProductsOperation {
  data: {
    collection: {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
}

export interface ShopifyCollectionsOperation {
  data: {
    collections: Connection<ShopifyCollection>;
  };
}

export interface ShopifyMenuOperation {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
}

export interface ShopifyPageOperation {
  data: { pageByHandle: Page };
  variables: { handle: string };
}

export interface ShopifyPagesOperation {
  data: {
    pages: Connection<Page>;
  };
}

export interface ShopifyProductOperation {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
}

export interface ShopifyProductRecommendationsOperation {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  };
}

export interface ShopifyProductsOperation {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
}
