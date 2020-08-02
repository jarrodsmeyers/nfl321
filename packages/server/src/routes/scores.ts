import { Router } from "express";

import Game from "../models/game";
import logger from "../config/logger";

const router = Router();

router.get("/", async (req, res) => {
  const { week } = req.query;

  if (!week) {
    res.sendStatus(400);
    return;
  }

  try {
    const scores = await Game.find({ season: "2019", week });

    res.json(scores);
  } catch (err) {
    res.sendStatus(500);
    logger.error(err);
  }
});

export default router;
