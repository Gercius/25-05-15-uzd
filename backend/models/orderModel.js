import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        meals: [
            {
                meal: {
                    type: mongoose.Schema.ObjectId,
                    ref: "Meal",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        menu: {
            type: mongoose.Schema.ObjectId,
            ref: "Menu",
            required: true,
        },
        food_provider: {
            type: mongoose.Schema.ObjectId,
            ref: "FoodProvider",
            required: true,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: false,
        },
        status: {
            type: String,
            enum: ["pending", "preparing", "completed", "cancelled"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
