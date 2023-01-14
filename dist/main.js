"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logger_1 = require("./app/config/logger");
const app = (0, express_1.default)();
const startServer = (app) => {
    app.listen(process.env.APP_PORT || 5000, (cb) => {
        logger_1.log.info(`Server started on port ${process.env.APP_PORT || 5000} ${cb || ''}`);
    });
};
startServer(app);
//# sourceMappingURL=main.js.map