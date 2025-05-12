import { Request, Response, NextFunction } from "express";
import { playerService, PlayerService } from "../service/player.service";
import { CreatePlayerDto } from "../dto/player.dto";

// Define an interface for the authenticated user object attached by Passport JWT strategy

export class PlayerController {
  async createPlayer(
    req: Request, // Use standard Request type
    res: Response
  ): Promise<void> {
    try {
      const playerData: CreatePlayerDto = req.body;
      const newPlayer = await playerService.createPlayer(playerData);

      res.status(201).json({
        message: "Player created successfully",
        data: { player: newPlayer },
      });
    } catch (error) {
      // Pass error to the global error handler
      console.error("Error creating Player:", error);
    }
  }

  async getPlayers(req: Request, res: Response): Promise<void> {
    try {
      // Call the correct service method
      const players = await playerService.getPlayers();

      res
        .status(200)
        .json({ message: "Players fetched successfully", data: { players } }); // Correct message
    } catch (error) {
      console.error("Error fetching Players:", error); // Correct log message
    }
  }
}

export const playerController = new PlayerController();
