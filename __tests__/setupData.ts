import mongoose from "mongoose";

import User from "../src/models/user/user.model";
import Contract from "../src/models/contract/contract.model";
import Plan from "../src/models/plan/plan.model";
import { PlanHsSku } from "../src/models/plan/plan.interface";

const IDS = {
  USER: new mongoose.Types.ObjectId("5d93751d1c40e30016565236"),
  CONTRACT: new mongoose.Types.ObjectId("5d93751d1c40e30016565226"),
  PLAN: new mongoose.Types.ObjectId("4edd40c86762e0fb12000003"),
};

const data = async () => {
  await new Plan({
    _id: IDS.PLAN,
    name: "Grátis",
    hs_sku: PlanHsSku.FREE,
    price: 0,
  }).save();
  await new Contract({
    _id: IDS.CONTRACT,
    plan: IDS.PLAN,
  }).save();
  await new User({
    _id: IDS.USER,
    name: "Jest user",
    email: "user@jest.com",
    contract: IDS.CONTRACT,
    password: "123",
  }).save();
};

export { data, IDS };
