import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {User} from "../resources/user/user.model";
import {Product} from "../resources/product/product.model";

export class TestDataSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const user = em.create(User, {
      id: 'b705c113-de0d-4d56-9442-813363f01dda'
    });

    const audi = em.create(Product, {
      title: 'Audi RSQ8',
      description:'',
      price: 200000,
    });

    const porsche = em.create(Product, {
      title: 'Porsche Cayenne',
      description:'',
      price: 100000,
    });
  }
}
