import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { AppError } from "../utils/AppError.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) throw new AppError("Name, email, and password are required", 400);

        const existingUser = await User.findOne({ email });
        if (existingUser) throw new AppError("User already exists", 409);

        const newUser = await User.create([{ name, email, password, role }]);

        const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        const userWithoutPassword = newUser[0].toObject();
        delete userWithoutPassword.password;

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                token,
                user: userWithoutPassword,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) throw new AppError("Email and password are required", 400);

        const user = await User.findOne({ email }).select("+password");
        if (!user) throw new AppError("User not found", 404);

        const isPasswordValid = await user.correctPassword(password, user.password);
        if (!isPasswordValid) throw new AppError("Invalid password", 401);

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                token,
                user: userWithoutPassword,
            },
        });
    } catch (error) {
        next(error);
    }
};

// todo logout
