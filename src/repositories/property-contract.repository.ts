import BaseRepository from "../core/base.repository";
import { IPropertyContract } from "../models/propertyContract/propertyContract.interface";
import PropertyContract from "../models/propertyContract/propertyContract.model";

class PropertyContractRepository extends BaseRepository<IPropertyContract> {
  constructor() {
    super(PropertyContract);
  }
}

export default new PropertyContractRepository();
