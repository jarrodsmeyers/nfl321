"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const express_1 = require("express");
const game_1 = __importDefault(require("../models/game"));
const getGames_1 = __importDefault(require("../util/getGames"));
const logger_1 = __importDefault(require("../config/logger"));
const router = express_1.Router();
router.post("/load-schedule", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const week of Array(16).keys()) {
            const games = yield getGames_1.default(String(week + 1));
            games.forEach((game) => new game_1.default(game).save());
        }
        res.sendStatus(201);
    }
    catch (err) {
        logger_1.default.error(err);
        res.sendStatus(500);
    }
}));
router.put("/update-scores", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const week of Array(16).keys()) {
            const games = yield getGames_1.default(String(week + 1));
            games.forEach((game) => {
                game_1.default.replaceOne({
                    key: `${game.home.team} vs ${game.away.team}`,
                }, game, (error, doc) => {
                    if (error || !doc) {
                        throw new Error();
                    }
                });
            });
        }
        res.sendStatus(204);
    }
    catch (err) {
        logger_1.default.error(err);
        res.sendStatus(500);
    }
}));
exports.default = router;
