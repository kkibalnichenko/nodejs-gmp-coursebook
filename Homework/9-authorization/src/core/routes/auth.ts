import express, { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../../resources/user/user.service';
import bcrypt from 'bcryptjs';
import { asyncHandler } from '../../utils/async-handler';
import { ValidationException } from '../../exceptions/ValidationException';

export const authRouter = express.Router();

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
        throw new ValidationException({message: 'All inputs are required'});
    }

    // Validate if user exist in our database
    const user = await findUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password).catch(console.error))) {
        // Create token
        const token = jwt.sign(
            { user_id: user.id, email },
            process.env.TOKEN_KEY!,
            {
                expiresIn: "2h",
            }
        );

        return res.status(200).json({
            token
        });
    }

    throw new ValidationException({message: 'Invalid Credentials'});
}

const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
        throw new ValidationException({message: 'All inputs are required'});
    }

    // Validate if user already exist in our database
    const oldUser = await findUserByEmail(email);

    if (oldUser) {
        throw new ValidationException({message: 'User Already Exist. Please Login'});
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(email.toLowerCase(), encryptedPassword);

    res.status(201).send();
}

authRouter.post("/login", asyncHandler(login));
authRouter.post("/register", asyncHandler(register));