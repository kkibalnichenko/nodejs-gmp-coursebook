import * as userRepository from './user.repository';
import {UserEntity} from "./user.entity";

export function findUserById(userId: string) : Promise<UserEntity |null> {
  return userRepository.findUserById(userId);
}
