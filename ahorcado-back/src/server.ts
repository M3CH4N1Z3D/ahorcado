import "reflect-metadata"; // Must be imported first for TypeORM
import app from "./app";
import { initializeDatabase } from "./database/data-source";
import "dotenv/config"; // Ensure environment variables are loaded

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // Initialize database connection
    await initializeDatabase();

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
