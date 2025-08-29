import express, { json } from "express";
import authRoutes from "./routes/auth.route.js";

import testReportRoutes from "./routes/testReportRoutes.js";
import receiveReportRoutes from "./routes/receiveReportRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import questionRoute from "./routes/questions.route.js";
import dotenv from "dotenv";

const app = express();
app.use(json());
dotenv.config();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

app.use("/api/report", testReportRoutes);

app.use("/api/report", receiveReportRoutes);

app.use("/api", questionRoute);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.send("Hi");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
