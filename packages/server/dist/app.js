"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const middlewares_1 = __importDefault(require("./config/middlewares"));
const mongoose_1 = __importDefault(require("./config/mongoose"));
const logger_1 = __importDefault(require("./config/logger"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
mongoose_1.default();
const app = express_1.default();
app.use(morgan_1.default("common", { stream: logger_1.default.stream }));
const unless = (middleware, ...paths) => (req, res, next) => paths.some((path) => path === req.path) ? next() : middleware(req, res, next);
app.use(unless(middlewares_1.default, "/"));
app.get("/", (req, res) => {
    res.send("Hi Devon");
});
app.use("/v1", routes_1.default);
app.use("*", (_, res) => {
    res.send("404");
});
app.listen(process.env.PORT, () => console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`));
