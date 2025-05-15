import { AppError } from "../utils/AppError.js";
import FoodProvider from "../models/foodProviderModel.js";

export const createFoodProvider = async (req, res, next) => {
    try {
        const { name, address, code } = req.body;
        if (!name || !address || !code) throw new AppError("Name, address and code are required", 400);

        const existingProvider = await FoodProvider.findOne({ code });
        if (existingProvider) throw new AppError("Provider already exists", 409);

        const newProvider = await FoodProvider.create([{ name, address, code }]);

        res.status(201).json({
            success: true,
            message: "Food provider created successfully",
            data: newProvider,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllFoodProviders = async (req, res, next) => {
    try {
        const providers = await FoodProvider.find();
        if (!providers) throw new AppError("Providers not found", 404);

        res.status(200).json({
            success: true,
            data: providers,
        });
    } catch (error) {
        next(error);
    }
};

export const getFoodProviderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const provider = await FoodProvider.findById(id);
        if (!provider) throw new AppError("Provider not found", 404);

        res.status(200).json({
            success: true,
            data: provider,
        });
    } catch (error) {
        next(error);
    }
};

export const updateFoodProvider = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, address, code } = req.body;

        const updated = await FoodProvider.findByIdAndUpdate(
            id,
            { name, address, code },
            { new: true, runValidators: true }
        );

        if (!updated) throw new AppError("Provider not found", 404);

        res.status(200).json({
            success: true,
            message: "Food provider updated successfully",
            data: updated,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteFoodProvider = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await FoodProvider.findByIdAndDelete(id);

        if (!deleted) throw new AppError("Provider not found", 404);

        res.status(200).json({
            success: true,
            message: "Food provider deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
