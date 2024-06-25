import BaseService from "../core/base.service";
import { IUser } from "../models/user/user.interface";
import UserRepository from "../repositories/user.repository";

export class UserService extends BaseService<IUser> {
  constructor() {
    super(UserRepository);
  }
}

export default new UserService();
