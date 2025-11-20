import express from "express";
import authRoutes from "./routes/auth.route.js"
import passport from "./config/passport.js";
import "./config/db.js"
import testReportRoutes from "./routes/testReportRoutes.js";
import receiveReportRoutes from "./routes/receiveReportRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import questionRoute from "./routes/questions.route.js";
import dotenv from "dotenv";

import morgan from "morgan";
import helmet from "helmet";
import { rateLimiter } from "./rateLimitter.js";



const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);



app.use(helmet());
app.use(rateLimiter);
app.use(morgan("dev"));
app.use(passport.initialize());

app.use("/auth",authRoutes);




app.use("/report", testReportRoutes);

app.use("/report", receiveReportRoutes);

app.use("/questions", questionRoute);

const port = process.env.PORT || 9000;

app.get("/", (req, res) => {
  return res.send("Hi");
});

app.listen(port, () => console.log(`Server running on port ${port}`));


