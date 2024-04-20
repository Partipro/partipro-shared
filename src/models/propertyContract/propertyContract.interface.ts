import { IContract } from "../contract/contract.interface";
import { IProperty } from "../property/property.interface";
import { IUser } from "../user/user.interface";

export enum PropertyContractStatus {
  ACTIVE = "ACTIVE",
  AWAITING_SIGN = "AWAITING_SIGN",
  EXPIRED = "EXPIRED",
}

export interface IPropertyContract {
  _id: string;
  property: IProperty | string;
  renter: IUser | string;
  document?: string;
  signedAt?: string;
  status: PropertyContractStatus;
  contract: IContract | string;
}
