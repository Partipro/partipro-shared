import BaseService from "../core/base.service";
import { IProperty } from "../models/property/property.interface";
import PropertyRepository from "../repositories/property.repository";

export class PropertyService extends BaseService<IProperty> {
  constructor() {
    super(PropertyRepository);
  }
}

export default new PropertyService();
