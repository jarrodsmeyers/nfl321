"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoConnect = () => {
    const { MONGO_URL } = process.env;
    mongoose_1.default.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose_1.default.connection.once("open", () => console.log(`Successfully connected to '${MONGO_URL}'!`));
};
exports.default = mongoConnect;
