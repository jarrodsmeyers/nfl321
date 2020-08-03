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
const cors_1 = __importDefault(require("cors"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("./logger"));
const router = express_1.Router();
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault(),
    databaseURL: "https://nfl321-dd967.firebaseio.com",
});
const decodeIdToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if ((_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.startsWith("Bearer ")) {
        const idToken = req.headers.authorization.split("Bearer ")[1];
        try {
            const decodedToken = yield firebase_admin_1.default.auth().verifyIdToken(idToken);
            res.locals.currentUser = decodedToken;
        }
        catch (err) {
            logger_1.default.error(err);
            res.sendStatus(403);
            return;
        }
    }
    else {
        res.sendStatus(401);
        return;
    }
    next();
});
router.use(cors_1.default());
router.use(decodeIdToken);
exports.default = router;
