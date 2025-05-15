import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import User from "../models/userModel.js";
import { JWT_SECRET } from "../config/env.js";

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, JWT_SECRET);

            const currentUser = await User.findById(decoded.userId).select("-password");
            if (!currentUser) throw new AppError("User not found", 401);

            req.user = currentUser;
            next();
        } catch (error) {
            return next(new AppError("Invalid or expired token", 401));
        }
    } else {
        return next(new AppError("No token provided", 401));
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("Forbidden: insufficient privileges", 403));
        }
        next();
    };
};
