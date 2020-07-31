/* eslint-disable no-console */
import mongoose from "mongoose";

import express from "express";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import cors from "cors";

import dotenv from "dotenv";

import { scoresRoutes } from "./routes";

dotenv.config();

// MONGO SETUP
const { MONGO_URL } = process.env;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () =>
  console.log(`Successfully connected to '${MONGO_URL}'!`)
);

// EXPRESS SETUP
const app = express();

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

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi Devon");
});

app.use(jwtCheck);

app.use("/scores", scoresRoutes);

app.use("*", (_, res) => {
  res.send("404");
});

app.listen(process.env.PORT, () =>
  console.log(`🚀  Server running on port ${process.env.PORT}`)
);
