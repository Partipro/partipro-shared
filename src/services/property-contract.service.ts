import BaseService from "../core/base.service";
import { IPropertyContract } from "../models/propertyContract/propertyContract.interface";
import PropertyContractRepository from "../repositories/property-contract.repository";

export class PropertyContractService extends BaseService<IPropertyContract> {
  constructor() {
    super(PropertyContractRepository);
  }
}

export default new PropertyContractService();
