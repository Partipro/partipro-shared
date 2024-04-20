import { IContract } from "../contract/contract.interface";

export enum Roles {
  ADMIN = "ADMIN",
  RENTER = "RENTER",
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  contract: string | IContract;
  role: Roles;
  comparePassword: (password: string) => Promise<boolean>;
}
