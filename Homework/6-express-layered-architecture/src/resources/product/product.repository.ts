import { ProductEntity } from './product.entity';

const products: Record<string, ProductEntity> = {
  '1': {
    id: '1',
    title: 'Audi RSQ8',
    description: 'The best car ever',
    price: 185000
  }
};

export function getProducts() {
  return Object.values(products);
}

export function getProductById(productId: string) {
  return products[productId] || null;
}

