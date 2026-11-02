//NODE_MODULES IMPORTS
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

//FILES IMPORT
import logger from "./utils/logger.js";
import userRoute from "./routers/userRoute.js";
import postRoute from "./routers/userRoute.js";
import groupRoute from "./routers/groupRoute.js";
import { errorMiddleware } from "./middleware/errorHandler.js";

//CONFIGURATION
const app = express();

//VARIABLES
const PORT = process.env.PORT;
const MONGO_URI = process.env.COMPASS_URI;

//MIDDLEWARE
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(
  morgan("combined", {
    stream: { write: (msg) => logger.info(msg.trim()) },
  }),
);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/post", groupRoute);

app.use((req, res) => {
  res.status(404).json({ ERROR: "PAGE NOT FOUND" });
});

app.use(errorMiddleware);

//CONNECTION
mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.info("MONGODB CONNECTED SUCCESSFULLY");
    app.listen(PORT, () => logger.info(`SERVER IS RUNNING ON PORT ${PORT}`));
  })
  .catch((err) => {
    logger.error("MongoDB connection failed", {
      error: err.message,
      stack: err.stack,
    });
    process.exit(1);
  });
