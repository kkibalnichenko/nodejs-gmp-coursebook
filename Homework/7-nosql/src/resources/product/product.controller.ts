import { Request, Response } from 'express';
import * as productService from './product.service';

export async function getProducts(req: Request, res: Response) {
  const products = await productService.getProducts();
  res.json(products);
}

export async function getProductById(req: Request<{ productId: string }>, res: Response) {
  const product = await productService.getProductById(req.params.productId);
  res.json(product);
}

export async function addProduct(req: Request, res: Response) {
  const product = await productService.addProduct(req.body);
  res.json(product);
}
