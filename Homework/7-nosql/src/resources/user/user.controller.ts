import { Request, Response, NextFunction } from 'express';
import * as userService from './user.service';
import { responseWrapper } from '../../utils/responseWrapper';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = await userService.createUser();

    return res.json(responseWrapper({ id }));
  } catch (error) {
    next(error);
  }
}
