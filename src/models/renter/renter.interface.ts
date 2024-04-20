import { IContract } from "../contract/contract.interface";

export interface IRenter {
  name: string;
  _id: string;
  email: string;
  business: string;
  contract: IContract | string;
}
