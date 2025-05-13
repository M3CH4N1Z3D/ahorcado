import { AppDataSource } from "../../../database/data-source"; // Relative path
import { CreatePlayerDto } from "../dto/player.dto";
import { Player } from "../entity/player.entity";

export class PlayerService {
  private playerRepository = AppDataSource.getRepository(Player);

  async createPlayer(playerData: CreatePlayerDto): Promise<Player> {
    const newPlayer = this.playerRepository.create({
      name: playerData.name,
      score: playerData.score,
    });

    await this.playerRepository.save(newPlayer);
    console.log("Saved new Player to database:", newPlayer);
    return newPlayer;
  }

  async getPlayers(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async deletePlayers(): Promise<void> {
    return this.playerRepository.clear();
  }
}

export const playerService = new PlayerService();
