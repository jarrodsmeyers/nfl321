import { Router } from "express";

import getScores from "../util/getScores";

const router = Router();

router.get("/", async (req, res) => {
  const { week } = req.query as { week: string };

  if (!week) {
    res.status(400).send("Must include week number");
    return;
  }

  try {
    const scores = await getScores(week);

    res.json(scores);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
