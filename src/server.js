import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mockRoutes from "./routes/mock.router.js";
import authRoutes from "./routes/auth.router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/mocks", mockRoutes); 
app.use("/api/auth", authRoutes); 

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/backendcoder";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
