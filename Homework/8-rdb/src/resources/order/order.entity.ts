import { CartItemFull } from '../cart/cart.entity';

export type ORDER_STATUS = 'created' | 'completed';

export interface OrderEntity {
  id: string,
  userId: string;
  cartId: string;
  items: CartItemFull[]
  payment: {
    type: string,
    address?: any,
    creditCard?: any,
  },
  delivery: {
    type: string,
    address: any,
  },
  comments: string,
  status: ORDER_STATUS;
  total: number;
}
