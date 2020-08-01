import { Schema, model } from "mongoose";

const gameSchema = new Schema({
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

export default model("Game", gameSchema);
