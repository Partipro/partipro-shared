import * as mongoDB from "mongodb";
import { ServerApiVersion } from "mongodb";

const connection = async () => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DATABASE_URI as string, {
    appName: process.env.DATABASE_NAME,
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
};

export default connection;
