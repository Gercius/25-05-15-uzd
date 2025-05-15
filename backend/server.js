import connectToDatabase from "./config/db.js";
import { PORT } from "./config/env.js";
import app from "./app.js";

connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
