import { Router } from "express";

import GameModel from "../models/game";
import getGames from "../util/getGames";

const router = Router();

router.post("/load-schedule", async (req, res) => {
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const week of Array(16).keys()) {
      // eslint-disable-next-line no-await-in-loop
      const games = await getGames(String(week + 1));

      games.forEach((game) => new GameModel(game).save());
    }
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/update-scores", async (req, res) => {
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const week of Array(16).keys()) {
      // eslint-disable-next-line no-await-in-loop
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
    res.status(500).send(err);
  }
});

export default router;
