import * as productRepository from './product.repository';
import { NotFoundException } from '../../exceptions/NotFoundException';
import { ProductEntity } from './product.entity';
export function getProducts(): Promise<ProductEntity[]> {
  return productRepository.getProducts();
}

export async function getProductById(productId: string): Promise<ProductEntity> {
  const product = await productRepository.getProductById(productId);
  if (!product) {
    throw new NotFoundException({ message: 'Product was not found' });
  }

  return product;
}

export async function isProductExisted(productId: string): Promise<boolean> {
  const product = await productRepository.getProductById(productId);
  if (!product) {
    throw new NotFoundException({ message: 'Product was not found' });
  }

  return !!product;
}

export async function areProductsExist(productIds: string[] | null | undefined): Promise<boolean> {
  if (!productIds || productIds.length === 0) return true;

  const count = await productRepository.getProductCountByIds(productIds);

  return count === productIds.length;
}

export async function addProduct(data: ProductEntity): Promise<ProductEntity> {
  const product = await productRepository.addProduct(data);

  if (!product) {
    throw new NotFoundException({ message: 'Product was not created' });
  }

  return product;
}
