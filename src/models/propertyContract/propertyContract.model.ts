import { Schema, model } from "mongoose";
import { IPropertyContract } from "./propertyContract.interface";

const propertySchema = new Schema<IPropertyContract>(
  {
    renter: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    signedAt: Date,
    status: {
      type: String,
      required: true,
    },
    property: {
      ref: "Property",
      type: Schema.Types.ObjectId,
      required: true,
    },
    document: {
      type: String,
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
