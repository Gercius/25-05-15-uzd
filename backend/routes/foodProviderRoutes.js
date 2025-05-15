import { Router } from "express";
import {
    createFoodProvider,
    getAllFoodProviders,
    getFoodProviderById,
    updateFoodProvider,
    deleteFoodProvider,
} from "../controllers/foodProviderController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const foodProviderRouter = Router();

foodProviderRouter.post("/", protect, authorize("admin"), createFoodProvider);
foodProviderRouter.get("/", getAllFoodProviders);
foodProviderRouter.get("/:id", getFoodProviderById);
foodProviderRouter.put("/:id", protect, authorize("admin"), updateFoodProvider);
foodProviderRouter.delete("/:id", protect, authorize("admin"), deleteFoodProvider);

export default foodProviderRouter;
