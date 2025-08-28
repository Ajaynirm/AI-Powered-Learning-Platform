import express, { json } from "express";
import authRoutes from "./routes/auth.route.js";

import testReportRoutes from "./routes/testReportRoutes.js";
import receiveReportRoutes from "./routes/receiveReportRoutes.js"
import cors from "cors";
import connection from "./config/db.js";
import cookieParser from "cookie-parser";
import questionRoute from "./routes/questions.route.js";

const app = express();
app.use(json());

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

app.use("/api/report", testReportRoutes);
///send-report
app.use("/api/report", receiveReportRoutes);

app.use("/api",questionRoute);

const port =  10000;

app.get("/",(req,res)=>{
    return res.send("Hi");
})
  


app.listen(port, () => console.log(`Server running on port ${port}`));




