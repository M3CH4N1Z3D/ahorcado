import { Router } from "express";

import { wordController } from "./word.controller";

const router = Router();

router.get("/", (req, res) => wordController.getWord(req, res));
router.get("/words", (req, res) => wordController.getAllWords(req, res));

export default router;
