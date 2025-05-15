import { Router } from "express";
import { createMeal, getAllMeals, getMealById, updateMeal, deleteMeal } from "../controllers/mealController.js";

const mealRouter = Router();

mealRouter.post("/", createMeal);
mealRouter.get("/", getAllMeals);
mealRouter.get("/:id", getMealById);
mealRouter.put("/:id", updateMeal);
mealRouter.delete("/:id", deleteMeal);

export default mealRouter;
