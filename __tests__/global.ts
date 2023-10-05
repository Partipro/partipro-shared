import * as global from "@jest/globals";
import * as db from "./db";
import { data } from "./setupData";

global.beforeAll(async () => {
  await db.connect();
});

global.beforeEach(async () => {
  await data();
});

global.afterEach(async () => {
  await db.clearDatabase();
});

global.afterAll(async () => {
  await db.closeDatabase();
});
