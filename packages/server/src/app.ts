/* eslint-disable no-console */
import express from "express";
import dotenv from "dotenv";

import type { Router, Request, Response, NextFunction } from "express";

import middlewares from "./config/middlewares";
import mongooseConnect from "./config/mongoose";
import apiRoutes from "./routes";

dotenv.config();

mongooseConnect();
const app = express();

const unless = (middleware: Router, ...paths: string[]) => (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  paths.some((path) => path === req.path) ? next() : middleware(req, res, next);

app.use(unless(middlewares, "/"));

app.get("/", (req, res) => {
  res.send("Hi Devon");
});

app.use("/v1", apiRoutes);

app.use("*", (_, res) => {
  res.send("404");
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`)
);
