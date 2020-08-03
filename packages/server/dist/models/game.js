"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const gameSchema = new mongoose_1.Schema({
    season: Number,
    week: Number,
    key: String,
    home: {
        team: String,
        score: Number,
    },
    away: {
        team: String,
        score: Number,
    },
});
exports.default = mongoose_1.model("Game", gameSchema);
