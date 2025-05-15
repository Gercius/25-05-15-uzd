import { AppError } from "../utils/AppError.js";
import Menu from "../models/menuModel.js";

export const createMenu = async (req, res, next) => {
    try {
        const { name, food_provider } = req.body;
        if (!name || !food_provider) throw new AppError("Name and food provider are required", 400);

        const newMenu = await Menu.create([{ name, food_provider }]);

        res.status(201).json({
            success: true,
            message: "Menu created successfully",
            data: newMenu,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllMenus = async (req, res, next) => {
    try {
        const menus = await Menu.find();
        if (!menus) throw new AppError("Menus not found", 404);

        res.status(200).json({
            success: true,
            data: menus,
        });
    } catch (error) {
        next(error);
    }
};

export const getMenuById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const menu = await Menu.findById(id);
        if (!menu) throw new AppError("Menu not found", 404);

        res.status(200).json({
            success: true,
            data: menu,
        });
    } catch (error) {
        next(error);
    }
};

export const updateMenu = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, food_provider } = req.body;

        const updated = await Menu.findByIdAndUpdate(id, { name, food_provider }, { new: true, runValidators: true });

        if (!updated) throw new AppError("Menu not found", 404);

        res.status(200).json({
            success: true,
            message: "Menu updated successfully",
            data: updated,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteMenu = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Menu.findByIdAndDelete(id);

        if (!deleted) throw new AppError("Menu not found", 404);

        res.status(200).json({
            success: true,
            message: "Menu deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
