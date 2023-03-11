import express from 'express';
import { createUser } from './user.controller';
import { asyncHandler } from '../../utils/async-handler';

export const userRouter = express.Router();

userRouter.post('/create', asyncHandler(createUser));
