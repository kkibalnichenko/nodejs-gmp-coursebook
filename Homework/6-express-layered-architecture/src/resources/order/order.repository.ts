import { v4 } from 'uuid';
import { OrderEntity } from './order.entity';

const orders: Record<string, OrderEntity> = {};

export function createOrder(orderData: Omit<OrderEntity, 'id'>) {
  const id = v4();
  const order = {
    id,
    ...orderData
  }
  orders[id] = order;
  return order;
}
