import winston from "winston";
import appRoot from "app-root-path";

import dotenv from "dotenv";

dotenv.config();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: `${appRoot}/logs/error.log`,
      level: "error",
    }),
    new winston.transports.File({ filename: `${appRoot}/logs/combined.log` }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

logger.stream = <any>{
  write: (message: string) => {
    logger.info(message);
  },
};

export default logger;
