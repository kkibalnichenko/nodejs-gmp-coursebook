import { UserEntity } from './user.entity';
import {container} from '../../../init';
import {User} from './user.model';
import {EntityRepository, wrap} from '@mikro-orm/core';

let repository: EntityRepository<User>;

const getRepository = () => {
  if(!repository){
    repository = container.em.getRepository(User);
  }

  return repository;
}

export async function findUserById(userId: string) : Promise<UserEntity | null> {
  const user = await getRepository().findOne(userId);

  return user && wrap(user).toPOJO();
}

export async function findUserByEmail(email: string) : Promise<UserEntity | null> {
  const user = await getRepository().findOne({
    email: {
      $eq: email
    }
  });

  return user && wrap(user).toPOJO();
}

export async function createUser(email: string, password: string): Promise<UserEntity> {
  const user = await getRepository().create({ email, password });

  await getRepository().persistAndFlush(user);

  return user && wrap(user).toPOJO();
}