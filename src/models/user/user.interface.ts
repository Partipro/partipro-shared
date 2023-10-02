import { IContract } from "../contract/contract.interface";

export interface IUser {
  name: string;
  email: string;
  password: string;
  contract: string | IContract;
}
