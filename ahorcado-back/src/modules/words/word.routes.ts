import { Router } from "express";

import { wordController } from "./word.controller";

const router = Router();

router.get("/", (req, res) => wordController.getWord(req, res));

export default router;
