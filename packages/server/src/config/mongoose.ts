/* eslint-disable no-console */
import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const mongoConnect = () => {
  const { MONGO_URL } = process.env;

  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once("open", () =>
    console.log(`Successfully connected to '${MONGO_URL}'!`)
  );
};

export default mongoConnect;
