import express from 'express';
import { getProductById, getProducts } from './product.controller';

export const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/:productId', getProductById);
