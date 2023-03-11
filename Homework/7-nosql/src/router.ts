import express from 'express';
import { authMiddleware } from './middlewares/auth';
import { cartRouter } from './resources/cart/cart.routes';
import { productRouter } from './resources/product/product.routes';
import { userRouter } from './resources/user/user.routes';
export const rootRouter = express.Router();

rootRouter.use('/api/profile/cart', authMiddleware, cartRouter);
rootRouter.use('/api/products', authMiddleware, productRouter);
rootRouter.use('/api/user', userRouter);
