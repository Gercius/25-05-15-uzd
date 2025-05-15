import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Menu name is required"],
        },
        food_provider: {
            type: mongoose.Schema.ObjectId,
            ref: "FoodProvider",
            required: [true, "Food provider is required"],
        },
    },
    {
        timestamps: true,
    }
);

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
