import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contract: {
    ref: "Contract",
    type: Schema.Types.ObjectId,
  },
});

const User = model<IUser>("User", userSchema);

export default User;
