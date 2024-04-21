import { Schema, model } from "mongoose";
import { IPropertyContract, PropertyContractStatus } from "./propertyContract.interface";

const propertySchema = new Schema<IPropertyContract>(
  {
    renter: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    signedAt: Date,
    expiresAt: Date,
    status: {
      type: String,
      enum: [
        PropertyContractStatus.AWAITING_SIGN,
        PropertyContractStatus.ACTIVE,
        PropertyContractStatus.EXPIRED,
        PropertyContractStatus.CANCELED,
      ],
      required: true,
    },
    clicksignEnvelopeId: String,
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
    deleted: {
      type: Boolean,
      default: false,
    },
    canceledAt: Date,
  },
  { timestamps: true },
);

const PropertyContract = model<IPropertyContract>("PropertyContract", propertySchema);

export default PropertyContract;
