// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

// Import dependencies
import express from "express";
import cors from "cors";

// Import database connection and routes
import connectDB from "./db/db.js";
import readerRoutes from "./routes/reader.routes.js";
import writerRoutes from "./routes/writer.routes.js";

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/reader", readerRoutes);
app.use("/writer", writerRoutes);
// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Export app for server entry point
export default app;
