import BaseService from "../core/base.service";
import { IContract } from "../models/contract/contract.interface";
import ContractRepository from "../repositories/contract.repository";

export class ContractService extends BaseService<IContract> {
  constructor() {
    super(ContractRepository);
  }
}

export default new ContractService();
