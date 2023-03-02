import express from 'express';
import { checkout, deleteUserCart, getUserCart, updateUserCart } from './cart.controller';

export const cartRouter = express.Router();

cartRouter.get('/', getUserCart);
cartRouter.put('/', updateUserCart);
cartRouter.delete('/', deleteUserCart);
cartRouter.post('/checkout', checkout);
