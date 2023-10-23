import { IContract } from "../contract/contract.interface";
import { IRenter } from "../renter/renter.interface";

export interface IPropertyContract {
  _id: string;
  renter?: IRenter | string;
  signedAt?: string;
  active: boolean;
  contract: IContract | string;
}
