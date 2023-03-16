import { ProductEntity } from './product.entity';
import { Product } from './product.model';

export async function getProducts(): Promise<ProductEntity[]> {
  const products = await Product.find();

  return products.map((product: ProductEntity) => {
    const { id, title, description, price } = product;

    return {
      id,
      title,
      description,
      price,
    };
  });
}

export async function getProductById(productId: string): Promise<ProductEntity | null> {
  const product = await Product.findById(productId);

  if (!product) {
    return null;
  }

  return product;
}

export async function getProductCountByIds(productIds: string[]): Promise<number> {
  return Product.countDocuments({ _id: productIds });
}

export async function addProduct(data: ProductEntity): Promise<ProductEntity | null> {
  const product = new Product(data);

  const saved = product.save();

  if (!saved) {
    return null;
  }
  const { id, title, description, price } = product;

  return {
    id,
    title,
    description,
    price,
  };
}
