import * as userRepository from './user.repository';
import { UserEntity } from './user.entity';
import { NotFoundException } from '../../exceptions/NotFoundException';

export async function findUserById(userId: string): Promise<UserEntity | null> {
  return userRepository.findUserById(userId);
}

export async function createUser(): Promise<string> {
  const id = await userRepository.createUser();

  if (!id) {
    throw new NotFoundException({ message: 'User was not created' });
  }

  return id;
}
