import { UserEntity } from './user.entity';
import { User } from './user.model';
export async function findUserById(userId: string): Promise<UserEntity | null> {
  return User.findById(userId);
}

export async function createUser(): Promise<string | null> {
  const user = new User();

  const saved = await user.save();

  if (!saved) {
    return null;
  }

  return saved._id.toString();
}
