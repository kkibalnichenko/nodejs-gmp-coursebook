import { UserEntity } from './user.entity';
import {container} from "../../../init";
import {User} from "./user.model";
import {EntityRepository, wrap} from "@mikro-orm/core";

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
