import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { AppError } from "../utils/AppError.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) throw new AppError("Name, email, and password are required", 400);

        const existingUser = await User.findOne({ email });
        if (existingUser) throw new AppError("User already exists", 409);

        const newUser = await User.create([{ name, email, password }]);

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
