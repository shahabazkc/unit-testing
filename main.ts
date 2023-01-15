import dotenv from 'dotenv';
dotenv.config();
import app from './app/app';
import { log } from './app/config/logger';
import { Database } from './app/config/db';
const DB = new Database()

const exitHandler = (error: any) => {
    log.info(error);
    process.exit(1);
};

const unexpectedErrorHandler = err => {
    exitHandler(err);
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGINT", () => {
    DB.disconnect();
    log.info(
        "connection to database closed due to nodejs process termination"
    );
    // eslint-disable-next-line no-process-exit
    process.exit(0);
});

const startServer = async (app: any) => {
    await DB.connect(
        {
            mongoUri: process.env.MONGO_URI,
            host: 'localhost',
            name: process.env.APP_NAME,
            port: process.env.MONGO_DB_PORT || 27017,
            opts: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        }
    );
    app.listen(process.env.APP_PORT || 5000, (cb: undefined) => {
        log.info(`Server started on port ${process.env.APP_PORT || 5000} ${cb || ''}`);
    });
};


startServer(app);