import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandlerMIddleware.js";
import authRouter from "./routes/authRoutes.js";
import foodProviderRouter from "./routes/foodProviderRoutes.js";
import mealRouter from "./routes/mealRoutes.js";
import menuRouter from "./routes/menuRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Alive");
});

app.use("/api/auth", authRouter);
app.use("/api/food/provider", foodProviderRouter);
app.use("/api/food/meal", mealRouter);
app.use("/api/food/menu", menuRouter);
app.use("/api/food/order", orderRouter);

app.use(errorHandler);

export default app;
