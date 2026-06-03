import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bulkmobilemart";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
