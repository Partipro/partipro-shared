import { Schema, model } from "mongoose";
import { IPlan, PlanHsSku } from "./plan.interface";

const planSchema = new Schema<IPlan>({
  hs_sku: {
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
});

const Plan = model<IPlan>("Plan", planSchema);

export default Plan;
