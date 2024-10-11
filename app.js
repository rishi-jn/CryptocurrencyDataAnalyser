import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/crpto.routes.js";
import { fetchAllData } from "./controller/fetchAllData.js";
const app = express();

//middlewares
app.use(cors({ origin: process.env.CROS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

fetchAllData();

//routes
app.use("/", router); // http://localhost:8000

export default app;
