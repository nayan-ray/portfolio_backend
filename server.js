import app from "./app.js";
import { connectDb } from "./src/config/db.js";

app.listen(3000, () => {
    connectDb();
    console.log('Server is running on http://localhost:3000');
});