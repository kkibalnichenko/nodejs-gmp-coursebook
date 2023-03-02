import { Request, Response } from 'express';
import * as productService from './product.service';
import { ProductEntity } from './product.entity';
import { responseWrapper } from '../../utils/responseWrapper';


export function getProducts(req: Request, res: Response) {
  const products = productService.getProducts();
  res.json(products);
}

export function getProductById(req: Request<{ productId: string }>, res: Response) {
  const updatedCart = productService.getProductById(req.params.productId);
  res.json(updatedCart);
}
