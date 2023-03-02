import express from 'express';
import { getProductById, getProducts } from './product.controller';
import {asyncHandler} from "../../utils/async-handler";

export const productRouter = express.Router();

productRouter.get('/', asyncHandler(getProducts));
productRouter.get('/:productId', asyncHandler(getProductById));
