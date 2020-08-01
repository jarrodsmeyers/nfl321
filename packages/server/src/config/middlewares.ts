import { Router } from "express";

import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import cors from "cors";

const router = Router();

const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-hpsr22g5.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://nfl321.com",
  issuer: "https://dev-hpsr22g5.auth0.com/",
  algorithms: ["RS256"],
});

router.use(cors());

router.use(jwtCheck);

export default router;
