import { config } from "dotenv";
config({ path: "./.env" });

const requiredEnv = ["DB_URI", "DB_NAME", "JWT_SECRET", "JWT_EXPIRES_IN"];

for (const key of requiredEnv) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

export const { DB_URI, DB_NAME, JWT_SECRET, JWT_EXPIRES_IN } = process.env;
export const PORT = process.env.PORT || 3000;
