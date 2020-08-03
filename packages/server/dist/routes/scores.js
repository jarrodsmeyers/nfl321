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
const express_1 = require("express");
const game_1 = __importDefault(require("../models/game"));
const logger_1 = __importDefault(require("../config/logger"));
const router = express_1.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { week } = req.query;
    if (!week) {
        res.sendStatus(400);
        return;
    }
    try {
        const scores = yield game_1.default.find({ season: "2019", week });
        res.json(scores);
    }
    catch (err) {
        res.sendStatus(500);
        logger_1.default.error(err);
    }
}));
exports.default = router;
