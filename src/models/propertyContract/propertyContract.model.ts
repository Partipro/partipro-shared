import { Schema, model } from "mongoose";
import { IPropertyContract } from "./propertyContract.interface";

const propertySchema = new Schema<IPropertyContract>(
  {
    renter: {
      ref: "Renter",
      type: Schema.Types.ObjectId,
    },
    signedAt: Date,
    active: {
      type: Boolean,
      default: false,
    },
    contract: {
      ref: "Contract",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true },
);

const PropertyContract = model<IPropertyContract>("PropertyContract", propertySchema);

export default PropertyContract;
