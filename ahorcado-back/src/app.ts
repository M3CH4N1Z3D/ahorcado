import express, { Application, Request, Response, NextFunction } from "express";
import "dotenv/config"; // Ensure environment variables are loaded
import playersRoutes from "./modules/players/player.routes";
import wordsRoutes from "./modules/words/word.routes";
import cors from "cors"; // Import CORS middleware

const app: Application = express();

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["*"] // Add your production frontend URL here
    : [
        "*",
        "https://903b354h-3000.use2.devtunnels.ms/",
        "http://192.168.128.9:3000",
      ]; // Allow localhost for development

app.use(
  cors({
    origin: "*", // Permite cualquier origen
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
    credentials: true, // Permite cookies y credenciales
  })
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("El juego del ahorcado comienza!!!");
});

app.use("/api/players", playersRoutes);
app.use("/api/word", wordsRoutes);

export default app;
