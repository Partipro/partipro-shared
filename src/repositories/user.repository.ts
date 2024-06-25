import BaseRepository from "../core/base.repository";
import User from "../models/user/user.model";
import { IUser } from "../models/user/user.interface";

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }
}

export default new UserRepository();
