import { Request, Response, NextFunction } from "express";
import { wordService } from "./word.service";

// Define an interface for the authenticated user object attached by Passport JWT strategy

export class WordController {
  async getWord(req: Request, res: Response): Promise<void> {
    try {
      // Call the correct service method
      const word = await wordService.getWord();

      res
        .status(200)
        .json({ message: "Word fetched successfully", data: { word } }); // Correct message
    } catch (error) {
      console.error("Error fetching Word:", error); // Correct log message
    }
  }

  async getAllWords(req: Request, res: Response): Promise<void> {
    try {
      const words = await wordService.getAllWords();
      res
        .status(200)
        .json({ message: "Words fetched successfully", data: { words } });
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  }
}

export const wordController = new WordController();
