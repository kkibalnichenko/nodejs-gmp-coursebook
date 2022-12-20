import * as cartRepository from './cart.repository';
import { CartEntity, CartFull } from './cart.entity';
import { ValidationException } from '../../exceptions/ValidationException';
import { OrderEntity } from '../order/order.entity';
import * as orderService from '../order/order.service';
import * as productService from '../product/product.service';
import { toDtoCart, toFullCart } from './cart.mapper';


export function calculateCartTotalPrice(cart: CartFull) {
  return cart ? cart.items.reduce((acc, { product: { price }, count }) => {
    return acc + price * count;
  }, 0) : 0;
}


export function findOrCreateByUserId(userId: string) {
  const userCart = cartRepository.findByUserId(userId);
  if (!userCart) {
    return {
      cart: toDtoCart(cartRepository.createByUserId(userId)),
      total: 0,
    };
  }
  const cartFull = toFullCart(userCart);
  return { cart: toDtoCart(cartFull), total: calculateCartTotalPrice(cartFull) };
}

export function updateByUserId(userId: string, cart: Partial<CartEntity>) {
  const areProductsValid = cart?.items?.some(({ productId }) => productService.isProductExisted(productId)) ?? true;
  if (!areProductsValid) {
    throw new ValidationException({ message: 'Product was not found' });
  }
  const updatedCart = cartRepository.updateByUserId(userId, cart);
  const cartFull = toFullCart(updatedCart);
  return {
    cart: toDtoCart(cartFull),
    total: calculateCartTotalPrice(cartFull),
  };
}

export function deleteByUserId(userId: string) {
  return cartRepository.deleteByUserId(userId);
}

export function checkout(userId: string, orderData: Pick<OrderEntity, 'delivery' | 'comments' | 'payment'>) {
  const userCart = cartRepository.findByUserId(userId);
  if (!userCart || !userCart.items.length) {
    throw new ValidationException({ message: 'Cart is empty' })
  }
  const cartFull = toFullCart(userCart);
  
  const totalPrice = calculateCartTotalPrice(cartFull);
  const order = orderService.createOrder({
    ...orderData,
    userId,
    cartId: cartFull.id,
    items: cartFull.items,
    total: totalPrice,
  });
  cartRepository.deleteByUserId(userId);
  
  return order
}
