import { Router } from "express";
import { createMenu, getAllMenus, getMenuById, updateMenu, deleteMenu } from "../controllers/menuController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const menuRouter = Router();

menuRouter.post("/", protect, authorize("admin"), createMenu);
menuRouter.get("/", getAllMenus);
menuRouter.get("/:id", getMenuById);
menuRouter.put("/:id", protect, authorize("admin"), updateMenu);
menuRouter.delete("/:id", protect, authorize("admin"), deleteMenu);

export default menuRouter;
