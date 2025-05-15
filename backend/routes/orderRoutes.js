import { Router } from "express";
import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.post("/", createOrder);
orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
