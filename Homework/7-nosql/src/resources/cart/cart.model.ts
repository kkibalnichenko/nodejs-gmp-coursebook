import { CartEntity } from './cart.entity';
import { Product } from '../product/product.model';
import { model, Schema } from 'mongoose';

const cartSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  isDeleted: { type: Schema.Types.Boolean, required: false },
  userId: { type: Schema.Types.String, required: false },
  items: [
    {
      count: { type: Schema.Types.Number, default: 0, required: true },
      product: { type: Schema.Types.ObjectId, required: true, ref: Product },
    },
  ],
});

export const Cart = model<CartEntity>('Cart', cartSchema);
