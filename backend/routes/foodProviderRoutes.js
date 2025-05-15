import { Router } from "express";
import {
    createFoodProvider,
    getAllFoodProviders,
    getFoodProviderById,
    updateFoodProvider,
    deleteFoodProvider,
} from "../controllers/foodProviderController.js";

const foodProviderRouter = Router();

foodProviderRouter.post("/", createFoodProvider);
foodProviderRouter.get("/", getAllFoodProviders);
foodProviderRouter.get("/:id", getFoodProviderById);
foodProviderRouter.put("/:id", updateFoodProvider);
foodProviderRouter.delete("/:id", deleteFoodProvider);

export default foodProviderRouter;
