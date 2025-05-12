import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import { Player } from "../modules/players/entity/player.entity";
import { Word } from "../modules/words/word.entity";

// Load environment variables from .env file
dotenv.config();

const loadInicialData = async () => {
  const wordRepository = AppDataSource.getRepository(Word);

  const existingWords = await wordRepository.count();
  if (existingWords > 0) {
    console.log("🔹 Las palabras ya están cargadas en la base de datos.");
    return;
  }
  try {
    const wordsData = JSON.parse(fs.readFileSync("words.json", "utf8"));
    await wordRepository.save(wordsData);
    console.log("Initial data loaded successfully");
  } catch (error) {
    console.error("Error loading initial data:", error);
  }
};

const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  url:
    process.env.DATABASE_URL_INTERNAL ||
    // process.env.DATABASE_URL_EXTERNAL ||
    "",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "spm_integral_db",
  // synchronize: true SHOULD NOT be used in production - otherwise you can lose production data.
  // Use migrations instead.
  synchronize: true, // Explicitly set to false for migration generation and production
  logging:
    process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"], // Log queries in dev
  entities: [
    Player,
    Word,
    // Path relative to src/database/data-source.ts
    // Include both .ts and .js for flexibility during development and compiled state
    // path.join(__dirname, "..", "modules", "**", "entities", "*.entity.{ts,js}"),
  ],
  ssl: {
    rejectUnauthorized: false, // Render requiere esto si SSL está activado
  },
  migrations: [
    // Path relative to src/database/data-source.ts
    path.join(__dirname, "migrations", "*.{ts,js}"),
  ],
  subscribers: [],
  // If using TypeORM CLI, it might need the migrations table name specified
  migrationsTableName: "typeorm_migrations",
};

// Export the options object directly for the CLI
export const options = dataSourceOptions;

export const AppDataSource = new DataSource(dataSourceOptions);

// Optional: Function to initialize connection if needed elsewhere
export const initializeDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Data Source has been initialized successfully.");
      await loadInicialData();
    }
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    process.exit(1); // Exit process on connection error
  }
};
