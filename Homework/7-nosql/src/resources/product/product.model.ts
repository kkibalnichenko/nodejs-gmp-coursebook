import { model, Schema } from 'mongoose';
import { ProductEntity } from './product.entity';

const productSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  title: { type: Schema.Types.String, required: false },
  description: { type: Schema.Types.String, required: false },
  price: { type: Schema.Types.Number, required: false },
});

export const Product = model<ProductEntity>('Product', productSchema);
