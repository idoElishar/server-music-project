import usersService from './service.users';
import { loginUserSchema, registerUserSchema } from './users.model';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
const secret_key = process.env.SECRET || ""

const generateToken = (userId: string) => {
    return jwt.sign({ userId }, secret_key, { expiresIn: '3h' });
};

const registerUser = async (req: Request, res: Response) => {
    const { error } = registerUserSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    try {

        const newUser = req.body;
        const user = await usersService.registerUser(newUser);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { error } = loginUserSchema.validate({ email, password });
    if (error) return res.status(400).json({ message: error.details[0].message });
    try {
        const user = await usersService.loginUser(email, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user.email);
        return res.status(200).json({ user, token });
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};


export default {
    registerUser,
    loginUser,
}
