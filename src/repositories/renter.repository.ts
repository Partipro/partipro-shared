import BaseRepository from "../core/base.repository";
import User from "../models/user/user.model";
import { IUser, Roles } from "../models/user/user.interface";
import { Find } from "../core/repository";

class RenterRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  list({ filters, populate, sort, select }: Find<IUser> = {}): Promise<IUser[]> {
    return super.list({ filters: { ...filters, role: Roles.RENTER }, populate, sort, select });
  }
}

export default new RenterRepository();
