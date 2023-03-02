import { OrderEntity } from './order.entity';
import * as orderRepository from './order.repository';

export function createOrder(orderData: Omit<OrderEntity, 'id' | 'status'>) {
  return orderRepository.createOrder({
    ...orderData,
    status: 'created',
  });
}
