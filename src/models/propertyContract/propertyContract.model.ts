import { Schema, model } from "mongoose";
import { IPropertyContract } from "./propertyContract.interface";

const propertySchema = new Schema<IPropertyContract>(
  {
    active: {
      type: Boolean,
      default: false,
    },
    occupations: [
      { from: { type: Date, required: true }, to: Date, renter: { ref: "Renter", type: Schema.Types.ObjectId } },
    ],
    contract: {
      ref: "Contract",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true },
);

const PropertyContract = model<IPropertyContract>("PropertyContract", propertySchema);

export default PropertyContract;
