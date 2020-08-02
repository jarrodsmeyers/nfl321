import { Router } from "express";

import actions from "./actions";

const router = Router();

router.use("/actions", actions);

export default router;
