import { Router } from "express";

import actions from "./actions";
import scores from "./scores";

const router = Router();

router.use("/actions", actions);
router.use("/scores", scores);

export default router;
