import express from 'express';
import { checkout, deleteUserCart, getUserCart, updateUserCart } from './cart.controller';
import {asyncHandler} from "../../utils/async-handler";

export const cartRouter = express.Router();

cartRouter.get('/', asyncHandler(getUserCart));
cartRouter.put('/', asyncHandler(updateUserCart));
cartRouter.delete('/', asyncHandler(deleteUserCart));
cartRouter.post('/checkout', asyncHandler(checkout));