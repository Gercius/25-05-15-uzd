import { Router } from "express";
import { createMenu, getAllMenus, getMenuById, updateMenu, deleteMenu } from "../controllers/menuController.js";

const menuRouter = Router();

menuRouter.post("/", createMenu);
menuRouter.get("/", getAllMenus);
menuRouter.get("/:id", getMenuById);
menuRouter.put("/:id", updateMenu);
menuRouter.delete("/:id", deleteMenu);

export default menuRouter;
