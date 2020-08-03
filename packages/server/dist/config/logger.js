"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.File({
            filename: `${app_root_path_1.default}/logs/error.log`,
            level: "error",
        }),
        new winston_1.default.transports.File({ filename: `${app_root_path_1.default}/logs/combined.log` }),
    ],
});
if (process.env.NODE_ENV !== "production") {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple(),
    }));
}
logger.stream = {
    write: (message) => {
        logger.info(message);
    },
};
exports.default = logger;
