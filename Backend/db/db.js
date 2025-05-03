import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connected successfully");
    }
    ).catch((error) => {
      console.error("MongoDB connection error:", error.message);
      process.exit(1);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}


export default connectDB;