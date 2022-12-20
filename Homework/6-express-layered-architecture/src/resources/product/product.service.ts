import * as productRepository from './product.repository';
import { NotFoundException } from '../../exceptions/NotFoundException';


export function getProducts() {
  return productRepository.getProducts();
}

export function getProductById(productId: string) {
  const product = productRepository.getProductById(productId);
  if (!product) {
    throw new NotFoundException({ message: 'Product was not found' });
  }
  return product;
}

export function isProductExisted(productId: string) {
  const product = productRepository.getProductById(productId);
  if (!product) {
    throw new NotFoundException({ message: 'Product was not found' });
  }
  return !!product;
}
