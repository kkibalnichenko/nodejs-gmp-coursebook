import { Request, Response } from 'express';
import * as cartService from './cart.service';
import { CartEntity } from './cart.entity';
import { responseWrapper } from '../../utils/responseWrapper';
import { OrderEntity } from '../order/order.entity';


export function getUserCart(req: Request, res: Response) {
  const cart = cartService.findOrCreateByUserId(req.user.id);
  res.json(responseWrapper(cart));
}

export function updateUserCart(req: Request<never, never, Partial<CartEntity>>, res: Response) {
  const updatedCart = cartService.updateByUserId(req.user.id, req.body);
  res.json(responseWrapper(updatedCart));
}

export function deleteUserCart(req: Request, res: Response) {
  cartService.deleteByUserId(req.user.id);
  res.json(responseWrapper());
}

export function checkout(req: Request<never, never, Pick<OrderEntity, 'delivery' | 'comments' | 'payment'>>, res: Response) {
  const order = cartService.checkout(req.user.id, req.body);
  res.json(responseWrapper({ order }));
}
