import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";

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

userSchema.pre("save", function (next) {
  const user = this as IUser;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  const user = this as IUser;
  return bcrypt.compare(password, user.password);
};

const User = model<IUser>("User", userSchema);

export default User;
