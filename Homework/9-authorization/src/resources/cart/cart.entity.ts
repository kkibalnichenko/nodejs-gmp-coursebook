import { ProductEntity } from '../product/product.entity';

export interface CartItemEntity {
  productId: string;
  count: number;
}

export interface CartEntity {
  id: string;
  isDeleted: boolean;
  userId: string;
  items: CartItemEntity[];
}


export interface CartItemFull {
  product: ProductEntity;
  count: number;
}

export interface CartFull {
  id: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemFull[];
}
