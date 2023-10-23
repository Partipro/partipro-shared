import { Schema, model } from "mongoose";
import { IRenter } from "./renter.interface";

const renterSchema = new Schema<IRenter>(
  {
    name: {
      type: String,
      required: true,
    },
    business: String,
  },
  { timestamps: true },
);

const Renter = model<IRenter>("Renter", renterSchema);

export default Renter;
