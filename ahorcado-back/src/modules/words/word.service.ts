import { AppDataSource } from "../../database/data-source"; // Relative path
import { Word } from "./word.entity";

export class WordService {
  private wordRepository = AppDataSource.getRepository(Word);

  async getWord(): Promise<Word | null> {
    const word = await this.wordRepository
      .createQueryBuilder("word")
      .orderBy("RANDOM()")
      .limit(1)
      .getOne();

    return word;
  }

  async getAllWords(): Promise<Word[]> {
    const words = await this.wordRepository.find();

    return words;
  }
}

export const wordService = new WordService();
