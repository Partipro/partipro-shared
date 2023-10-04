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

userSchema.pre("save", (next) => {
  const user: unknown = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash((user as IUser).password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      (user as IUser).password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = (password: string, cb: (param1: Error | null, param2?: boolean) => void) => {
  const user: unknown = this;
  bcrypt.compare(password, (user as IUser).password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

const User = model<IUser>("User", userSchema);

export default User;
