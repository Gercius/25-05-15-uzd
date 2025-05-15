import mongoose from "mongoose";
import { DB_URI, DB_NAME } from "./env.js";

if (!DB_URI || !DB_NAME) {
    throw new Error("Missing DB_NAME or DB_URI in environment variables");
}

const DB = DB_URI.replace("<db_name>", DB_NAME);

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB);
        console.log(`Connected to database ${DB_NAME}`);
    } catch (error) {
        console.error("Error connecting to database: ", error);
        process.exit(1);
    }
};

export default connectToDatabase;
