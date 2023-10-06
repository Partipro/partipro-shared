import mongoose from "mongoose";

import User from "../src/models/user/user.model";

const IDS = {
  USER: new mongoose.Types.ObjectId("5d93751d1c40e30016565236"),
};

const data = async () => {
  await new User({
    _id: IDS.USER,
    name: "Jest user",
    email: "user@jest.com",
    password: "$2b$10$UjTqhopKDcy/ATrRCvJxtOLdyJeN3CUR4Xdw1L0yYVu8f37rk1gIO",
  }).save();
};

export { data, IDS };
