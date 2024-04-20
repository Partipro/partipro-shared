import { IContract } from "../contract/contract.interface";
import BaseInterface from "../BaseInterface";

export enum Roles {
  ADMIN = "ADMIN",
  RENTER = "RENTER",
}

export interface IUser extends BaseInterface {
  _id: string;
  name: string;
  email: string;
  password: string;
  contract: string | IContract;
  role: Roles;
  comparePassword: (password: string) => Promise<boolean>;
  business?: string;
}
