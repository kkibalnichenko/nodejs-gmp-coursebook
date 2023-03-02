import { Request, Response } from 'express';
import * as cartService from './cart.service';
import { CartEntity } from './cart.entity';
import { responseWrapper } from '../../utils/responseWrapper';
import { OrderEntity } from '../order/order.entity';


export async function getUserCart(req: Request, res: Response) {
  const cart = await cartService.findOrCreateByUserId(req.user.id);
  res.json(responseWrapper(cart));
}

export async function updateUserCart(req: Request<never, never, Partial<CartEntity>>, res: Response) {
  const updatedCart = await cartService.updateByUserId(req.user.id, req.body);
  res.json(responseWrapper(updatedCart));
}

export async function deleteUserCart(req: Request, res: Response) {
  await cartService.deleteByUserId(req.user.id);
  res.json(responseWrapper());
}

export async function checkout(req: Request<never, never, Pick<OrderEntity, 'delivery' | 'comments' | 'payment'>>, res: Response) {
  const order = await cartService.checkout(req.user.id, req.body);
  res.json(responseWrapper({ order }));
}
