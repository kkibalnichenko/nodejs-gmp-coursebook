import { v4 } from 'uuid';
import { CartEntity } from './cart.entity';
import { NotFoundException } from '../../exceptions/NotFoundException';

const carts: Record<string, CartEntity> = {};

export function findByUserId(userId: string) {
  return Object.values(carts).find((cart) => cart.userId === userId && !cart.isDeleted) || null;
}

export function createByUserId(userId: string) {
  const id = v4();
  const userCart = {
    id,
    userId,
    isDeleted: false,
    items: [],
  };
  
  carts[id] = userCart;
  
  return userCart;
}

export function updateByUserId(userId: string, cartData: Partial<CartEntity>) {
  const currentCart = findByUserId(userId);
  if (!currentCart) {
    throw new NotFoundException({ message: 'Cart was not found' });
  }
  const newItems = cartData?.items || [];
  const updatedCart = {
    ...currentCart,
    ...cartData,
    items: newItems,
  }
  
  carts[currentCart.id] = { ...updatedCart };
  
  return { ...updatedCart };
}

export function deleteByUserId(userId: string): void {
  updateByUserId(userId, { isDeleted: true });
}
