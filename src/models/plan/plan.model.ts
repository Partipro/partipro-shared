import { Schema, model } from "mongoose";
import { IPlan, PlanHsSku } from "./plan.interface";

const planSchema = new Schema<IPlan>(
  {
    hs_sku: {
      type: String,
      enum: PlanHsSku,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Plan = model<IPlan>("Plan", planSchema);

export default Plan;
