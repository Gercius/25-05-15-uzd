import { Router } from "express";
import {
    createMeal,
    getAllMeals,
    getMealById,
    updateMeal,
    deleteMeal,
    getMealsByMenuId,
} from "../controllers/mealController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const mealRouter = Router();

mealRouter.post("/", protect, authorize("admin"), createMeal);
mealRouter.get("/", protect, authorize("admin"), getAllMeals);
mealRouter.get("/:id", getMealById);
mealRouter.get("/menu/:menuId", getMealsByMenuId);
mealRouter.put("/:id", protect, authorize("admin"), updateMeal);
mealRouter.delete("/:id", protect, authorize("admin"), deleteMeal);

export default mealRouter;
