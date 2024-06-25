import BaseService from "../core/base.service";
import RenterRepository from "../repositories/renter.repository";
import { IUser } from "../models/user/user.interface";

export class RenterService extends BaseService<IUser> {
  constructor() {
    super(RenterRepository);
  }
}

export default new RenterService();
