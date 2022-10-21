import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import * as dotenv from "dotenv";
import helmet from "helmet";
import connectDB from "./db";
import appRoutes from "./routes";

const app = express();
dotenv.config({
  path: "./src/configs/config.env",
});

const port = Number(process.env.PORT) || 5000; //

app.use(morgan("dev"));
app.use(helmet());
app.use(express.static("Public"));
app.use([
  bodyParser.json({ limit: "50mb" }),
  cors({
    origin: "*", // allow any during development we will chnage this during production
  }),
  bodyParser.urlencoded({ extended: false }),
]);

app.get("/", (_req: Request, res) => {
  res.json({ success: true, message: "app is running normally" });
});
app.use("/api", appRoutes);

app.use((_req, res: Response, next) => {
  res.status(404).json({
    success: false,
    message: "Page not Found",
  });
});

connectDB(port, app);

// this is my comment
