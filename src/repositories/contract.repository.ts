import BaseRepository from "../core/base.repository";
import Contract from "../models/contract/contract.model";
import { IContract } from "../models/contract/contract.interface";

class ContractRepository extends BaseRepository<IContract> {
  constructor() {
    super(Contract);
  }
}

export default new ContractRepository();
