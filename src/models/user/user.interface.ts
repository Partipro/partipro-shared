import { IContract } from "../contract/contract.interface";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  contract: string | IContract;
}
