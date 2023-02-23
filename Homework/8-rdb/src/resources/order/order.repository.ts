import { OrderEntity } from './order.entity';
import {EntityRepository, serialize} from "@mikro-orm/core";
import {container} from "../../../init";
import {Order} from "./order.model";


let repository: EntityRepository<Order>;

const getRepository = () => {
  if (!repository) {
    repository = container.em.getRepository(Order);
  }

  return repository;
}

const orderToOrderEntity = (order:  Order) : OrderEntity => {
  return serialize(order,{
    exclude:['user','cart']
  })
}

export async function createOrder(orderData: Omit<OrderEntity, 'id'>) {
  const order = new Order();

  getRepository().assign(order,{
    ...orderData,
    user: orderData.userId,
    cart: orderData.cartId,
  })

  await getRepository().persistAndFlush(order);

  return orderToOrderEntity(order);
}
