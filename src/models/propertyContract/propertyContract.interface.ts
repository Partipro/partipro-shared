import { IContract } from "../contract/contract.interface";
import { IProperty } from "../property/property.interface";
import { IUser } from "../user/user.interface";
import BaseInterface from "../BaseInterface";

export enum PropertyContractStatus {
  ACTIVE = "ACTIVE",
  AWAITING_SIGN = "AWAITING_SIGN",
  EXPIRED = "EXPIRED",
  CANCELED = "CANCELED",
}

export interface IPropertyContract extends BaseInterface {
  _id: string;
  property: IProperty | string;
  expiresAt: string;
  renter: IUser | string;
  document?: string;
  signedAt?: string;
  status: PropertyContractStatus;
  contract: IContract | string;
  canceledAt?: string;
}
