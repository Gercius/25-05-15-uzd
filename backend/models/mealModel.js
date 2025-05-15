import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Meal name is required"],
            unique: true,
        },
        description: {
            type: String,
            required: [true, "Meal description is required"],
        },
        image_url: {
            type: String,
            default: "https://placehold.co/400x400?text=meal",
        },
        menus: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Menu",
                required: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;
