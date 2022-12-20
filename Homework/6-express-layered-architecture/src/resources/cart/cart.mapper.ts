import { CartEntity, CartFull, CartItemFull } from './cart.entity';
import * as productService from '../product/product.service';

export function toFullCart(cart: CartEntity) {
  const items = cart.items.map(({ count, productId }) => {
    const product = productService.getProductById(productId);
    return {
      product,
      count,
    }
  });
  return {
    ...cart,
    items,
  }
}

export function toDtoCart(cart: CartFull) {
  return {
    id: cart.id,
    items: cart.items,
  }
}
