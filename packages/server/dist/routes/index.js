"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actions_1 = __importDefault(require("./actions"));
const scores_1 = __importDefault(require("./scores"));
const router = express_1.Router();
router.use("/actions", actions_1.default);
router.use("/scores", scores_1.default);
exports.default = router;
