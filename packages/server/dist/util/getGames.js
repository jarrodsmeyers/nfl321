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
const axios_1 = __importDefault(require("axios"));
const node_html_parser_1 = require("node-html-parser");
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../config/logger"));
dotenv_1.default.config();
const season = process.env.CURRENT_SEASON;
const getGames = (week) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get(`https://www.pro-football-reference.com/years/${season}/week_${week}.htm`);
        const games = node_html_parser_1.parse(data).querySelectorAll("table.teams");
        const gameResults = games.map((game) => {
            const home = game.querySelectorAll("tr")[2];
            const away = game.querySelectorAll("tr")[1];
            const homeTeam = home.querySelector("a").firstChild.rawText;
            const awayTeam = away.querySelector("a").firstChild.rawText;
            return {
                season,
                week,
                key: `${homeTeam} vs ${awayTeam}`,
                home: {
                    team: homeTeam,
                    score: home.querySelector("td.right").rawText,
                },
                away: {
                    team: awayTeam,
                    score: away.querySelector("td.right").rawText,
                },
            };
        });
        return gameResults;
    }
    catch (err) {
        logger_1.default.error(err);
        return null;
    }
});
exports.default = getGames;
