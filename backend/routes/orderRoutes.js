import { Router } from "express";
import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from "../controllers/orderController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const orderRouter = Router();

orderRouter.post("/", createOrder);
orderRouter.get("/", protect, authorize("admin"), getAllOrders);
// todo - get user orders
orderRouter.get("/:id", protect, authorize("admin"), getOrderById);
orderRouter.put("/:id", protect, authorize("admin"), updateOrder);
orderRouter.delete("/:id", protect, authorize("admin"), deleteOrder);

export default orderRouter;
