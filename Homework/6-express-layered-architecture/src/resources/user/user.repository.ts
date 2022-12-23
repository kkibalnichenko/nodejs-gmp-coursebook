import { UserEntity } from './user.entity';


const users: Record<string, UserEntity> = {
  'b705c113-de0d-4d56-9442-813363f01dda': { id: 'b705c113-de0d-4d56-9442-813363f01dda' },
  '3b7a8c11-929e-4d65-8e68-c28e93a548ce': { id: '3b7a8c11-929e-4d65-8e68-c28e93a548ce' },
};

export function findUserById(userId: string) {
  return users[userId] || null;
}
