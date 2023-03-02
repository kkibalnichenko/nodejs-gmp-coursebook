import * as userRepository from './user.repository';

export function findUserById(userId: string) {
  return userRepository.findUserById(userId);
}
