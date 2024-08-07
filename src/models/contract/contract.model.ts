import { Schema, model } from "mongoose";
import { IContract } from "./contract.interface";

const contractSchema = new Schema<IContract>(
  {
    plan: {
      ref: "Plan",
      type: Schema.Types.ObjectId,
    },
    socialReason: String,
    documentNumber: String,
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Contract = model<IContract>("Contract", contractSchema);

export default Contract;
