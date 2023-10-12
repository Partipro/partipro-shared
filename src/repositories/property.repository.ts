import { Model } from "mongoose";
import BaseRepository from "../core/base.repository";
import { IProperty } from "../models/property/property.interface";
import Property from "../models/property/property.model";

class PropertyRepository extends BaseRepository<IProperty, Model<IProperty>> {
  constructor() {
    super(Property);
  }
}

export default PropertyRepository;
