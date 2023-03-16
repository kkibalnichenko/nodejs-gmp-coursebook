import { model, Schema } from 'mongoose';
import { UserEntity } from './user.entity';

const userSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  name: { type: Schema.Types.String, required: false },
});

export const User = model<UserEntity>('User', userSchema);
