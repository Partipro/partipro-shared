import BaseService from "../core/base.service";
import { IRenter } from "../models/renter/renter.interface";
import RenterRepository from "../repositories/renter.repository";

export class RenterService extends BaseService<IRenter> {
  constructor() {
    super(RenterRepository);
  }
}

export default new RenterService();
