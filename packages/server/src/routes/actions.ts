/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Router } from "express";

import GameModel from "../models/game";
import getGames from "../util/getGames";
import logger from "../config/logger";

const router = Router();

router.post("/load-schedule", async (req, res) => {
  try {
    for (const week of Array(16).keys()) {
      const games = await getGames(String(week + 1));

      games.forEach((game) => new GameModel(game).save());
    }
    res.sendStatus(201);
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }
});

router.put("/update-scores", async (req, res) => {
  try {
    for (const week of Array(16).keys()) {
      const games = await getGames(String(week + 1));

      games.forEach((game) => {
        GameModel.replaceOne(
          {
            key: `${game.home.team} vs ${game.away.team}`,
          },
          game,
          (error, doc) => {
            if (error || !doc) {
              throw new Error();
            }
          }
        );
      });
    }
    res.sendStatus(204);
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }
});

export default router;
