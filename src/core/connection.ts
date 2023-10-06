import { ServerApiVersion } from "mongodb";
import * as mongoose from "mongoose";

const connection = async () => {
  await mongoose.connect(process.env.DATABASE_URI as string, {
    minPoolSize: 5,
    maxPoolSize: 10,
    dbName: process.env.DATABASE_NAME,
    appName: "Partipro",
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
};

export default connection;
