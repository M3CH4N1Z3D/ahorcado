import { Router } from "express";
import {
  playerController,
  PlayerController,
} from "./controller/player.controller";

const router = Router();

router.post("/", (req, res) => playerController.createPlayer(req, res));

router.get("/", (req, res) => playerController.getPlayers(req, res));

export default router;
