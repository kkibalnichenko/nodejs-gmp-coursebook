import * as userRepository from './user.repository';
import {UserEntity} from "./user.entity";

export function findUserById(userId: string) : Promise<UserEntity |null> {
  return userRepository.findUserById(userId);
}

export function findUserByEmail(email: string) : Promise<UserEntity |null> {
  return userRepository.findUserByEmail(email);
}

export function createUser(email: string, password: string) : Promise<UserEntity> {
  return  userRepository.createUser(email, password);
}