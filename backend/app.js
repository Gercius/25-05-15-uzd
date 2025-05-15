import express from "express";
import errorHandler from "./middleware/errorHandlerMIddleware.js";
import authRouter from "./routes/authRoutes.js";
import foodProviderRouter from "./routes/foodProviderRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Alive");
});

app.use("/api/auth", authRouter);
app.use("/api/food/provider", foodProviderRouter);

app.use(errorHandler);

export default app;
