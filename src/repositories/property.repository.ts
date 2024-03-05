import BaseRepository from "../core/base.repository";
import { IProperty } from "../models/property/property.interface";
import Property from "../models/property/property.model";

class PropertyRepository extends BaseRepository<IProperty> {
  constructor() {
    super(Property);
  }
}

export default new PropertyRepository();
