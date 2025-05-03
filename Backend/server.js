import http from "http";
import app from "./app.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
