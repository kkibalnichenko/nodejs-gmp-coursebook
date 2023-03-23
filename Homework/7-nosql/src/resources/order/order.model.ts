import { model, Schema } from 'mongoose';
import { OrderEntity } from './order.entity';
import { Product } from '../product/product.model';

const orderSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  cart: { type: Schema.Types.ObjectId, required: true, ref: 'Cart' },
  items: [
    {
      count: { type: Schema.Types.Number, default: 0, required: true },
      product: Product.schema,
    },
  ],
  payment: {
    type: { type: Schema.Types.String, required: true },
    address: { type: Schema.Types.String, required: true },
    creditCard: { type: Schema.Types.String, required: true },
  },
  delivery: {
    type: { type: Schema.Types.String, required: true },
    address: { type: Schema.Types.String, required: false },
  },
  comments: { type: Schema.Types.String, required: false },
  status: { type: Schema.Types.String, required: true, enum: ['created', 'completed'] },
  total: { type: Schema.Types.Number, required: true },
});

export const Order = model<OrderEntity>('Order', orderSchema);
