import mongoose from "mongoose";

const foodProviderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Food provider name is required"],
            unique: true,
        },
        address: {
            type: String,
            required: [true, "Food provider address is required"],
        },
        code: {
            type: Number,
            unique: true,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const FoodProvider = mongoose.model("FoodProvider", foodProviderSchema, "food-providers");

export default FoodProvider;
