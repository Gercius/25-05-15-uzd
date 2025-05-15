import { AppError } from "../utils/AppError.js";
import Order from "../models/orderModel.js";

export const createOrder = async (req, res, next) => {
    try {
        const { meals, menu, food_provider, user, status } = req.body;

        if (!meals || !Array.isArray(meals) || meals.length === 0)
            throw new AppError("Meals are required and must be a non-empty array", 400);

        if (!menu || !food_provider) throw new AppError("Menu and food provider are required", 400);

        const newOrder = await Order.create({ meals, menu, food_provider, user, status });

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: newOrder,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate({ path: "meals.meal", select: "_id" })
            .populate({ path: "menu", select: "_id" })
            .populate({ path: "food_provider", select: "_id" })
            .populate({ path: "user", select: "_id" });

        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id)
            .populate({ path: "meals.meal", select: "_id" })
            .populate({ path: "menu", select: "_id" })
            .populate({ path: "food_provider", select: "_id" })
            .populate({ path: "user", select: "_id" });

        if (!order) throw new AppError("Order not found", 404);

        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        next(error);
    }
};

export const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { meals, menu, food_provider, user, status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { meals, menu, food_provider, user, status },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) throw new AppError("Order not found", 404);

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: updatedOrder,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) throw new AppError("Order not found", 404);

        res.status(200).json({
            success: true,
            message: "Order deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
