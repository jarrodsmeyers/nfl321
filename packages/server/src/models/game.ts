import { Schema, model } from "mongoose";

const gameSchema = new Schema({
  season: Number,
  week: Number,
});
