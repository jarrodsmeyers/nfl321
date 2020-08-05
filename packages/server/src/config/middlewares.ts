import { Router } from "express";
import cors from "cors";
import admin from "firebase-admin";

import type { Request, Response, NextFunction } from "express";
import logger from "./logger";

const router = Router();

// admin.initializeApp({
//   credential: admin.credential.cert(
//     JSON.parse(Buffer.from(process.env.FIREBASE_CONFIG, "base64").toString())
//   ),
//   databaseURL: "https://nfl321-dd967.firebaseio.com",
// });

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://nfl321-dd967.firebaseio.com",
});

const decodeIdToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers?.authorization?.startsWith("Bearer ")) {
    const idToken = req.headers.authorization.split("Bearer ")[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      res.locals.currentUser = decodedToken;
    } catch (err) {
      logger.error(err);
      res.sendStatus(403);
      return;
    }
  } else {
    res.sendStatus(401);
    return;
  }

  next();
};

router.use(cors({ origin: [/\.nfl321\.com$/, "http://localhost:9999"] }));
router.use(decodeIdToken);

export default router;
