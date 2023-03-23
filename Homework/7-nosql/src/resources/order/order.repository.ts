import { OrderEntity } from './order.entity';
import { Order } from './order.model';

const orderToOrderEntity = (order: Partial<OrderEntity>): Partial<OrderEntity> => {
  const omitKeys: string[] = ['user', 'cart'];

  return Object.keys(order).reduce((result, key) => {
    if (omitKeys.includes(key)) {
      return result;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    result[key] = order[key];

    return result;
  }, {});
};

export async function createOrder(orderData: Omit<OrderEntity, 'id'>) {
  const order = new Order({
    ...orderData,
    user: orderData.userId,
    cart: orderData.cartId,
  });

  const saved = await order.save();
  const newOrder = await Order.findById(saved._id).lean();

  if (!newOrder) {
    return null;
  }

  return orderToOrderEntity(newOrder);
}
