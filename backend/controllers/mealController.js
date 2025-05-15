import { AppError } from "../utils/AppError.js";
import Meal from "../models/mealModel.js";

export const createMeal = async (req, res, next) => {
    try {
        const { name, description, image_url } = req.body;
        if (!name || !description) throw new AppError("Name and description are required", 400);

        const existingMeal = await Meal.findOne({ name });
        if (existingMeal) throw new AppError("Meal already exists", 409);

        const newMeal = await Meal.create([{ name, description, image_url }]);

        res.status(201).json({
            success: true,
            message: "Meal created successfully",
            data: newMeal,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllMeals = async (req, res, next) => {
    try {
        const meals = await Meal.find();
        if (!meals) throw new AppError("Meals not found", 404);

        res.status(200).json({
            success: true,
            data: meals,
        });
    } catch (error) {
        next(error);
    }
};

export const getMealById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const meal = await Meal.findById(id);
        if (!meal) throw new AppError("Meal not found", 404);

        res.status(200).json({
            success: true,
            data: meal,
        });
    } catch (error) {
        next(error);
    }
};

export const updateMeal = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, image_url } = req.body;

        const updated = await Meal.findByIdAndUpdate(
            id,
            { name, description, image_url },
            { new: true, runValidators: true }
        );

        if (!updated) throw new AppError("Meal not found", 404);

        res.status(200).json({
            success: true,
            message: "Meal updated successfully",
            data: updated,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteMeal = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Meal.findByIdAndDelete(id);

        if (!deleted) throw new AppError("Meal not found", 404);

        res.status(200).json({
            success: true,
            message: "Meal deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
