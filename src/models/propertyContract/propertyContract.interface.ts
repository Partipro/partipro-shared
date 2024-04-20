import { IContract } from "../contract/contract.interface";
import { IRenter } from "../renter/renter.interface";

export enum PropertyContractStatus {
  ACTIVE = "ACTIVE",
  AWAITING_SIGN = "AWAITING_SIGN",
  EXPIRED = "EXPIRED",
}

export interface IPropertyContract {
  _id: string;
  renter?: IRenter | string;
  signedAt?: string;
  status: PropertyContractStatus;
  contract: IContract | string;
}
