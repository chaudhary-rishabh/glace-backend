import app from "./app";
import connectDB from "./config/db";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});