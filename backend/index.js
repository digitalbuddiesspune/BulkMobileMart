import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/dbconfig.js";
import heroBannerRoutes from "./routes/heroBannerRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.JWT_SECRET) {
  console.warn(
    "Warning: JWT_SECRET is not set in .env — signup and login will fail until you add it."
  );
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "BulkMobileMart API is running" });
});

app.use("/api/herobanners", heroBannerRoutes);
app.use("/api/users", userRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;
