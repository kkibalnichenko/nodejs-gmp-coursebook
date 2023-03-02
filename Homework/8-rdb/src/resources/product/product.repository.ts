import {ProductEntity} from './product.entity';
import {container} from "../../../init";
import {Product} from "./product.model";
import {EntityRepository, wrap} from "@mikro-orm/core";

let repository: EntityRepository<Product>;

const getRepository = () => {
  if(!repository){
    repository = container.em.getRepository(Product);
  }

  return repository;
}

export async function getProducts() : Promise<ProductEntity[]> {
  const products = await getRepository().findAll();

  return products.map(product => wrap(product).toPOJO());
}

export async function getProductById(productId: string) : Promise<ProductEntity | null>{
  const product  = await getRepository().findOne(productId);

  return product && wrap(product).toPOJO();
}

export async function getProductCountByIds(productIds: string[]) : Promise<number>{
  await getRepository().find({id: productIds});
  return await getRepository().count({id: productIds});
}

