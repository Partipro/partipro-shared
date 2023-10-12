import { Schema, model } from "mongoose";
import { IProperty } from "./property.interface";

const propertySchema = new Schema<IProperty>({
  city: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  monthRent: {
    type: Number,
  },
  squareMeters: {
    type: Number,
  },
  owner: {
    ref: "User",
    type: Schema.Types.ObjectId,
  },
  contract: {
    ref: "Contract",
    type: Schema.Types.ObjectId,
  },
});

const Property = model<IProperty>("Property", propertySchema);

export default Property;