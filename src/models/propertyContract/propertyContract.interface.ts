import { IContract } from "../contract/contract.interface";
import { IRenter } from "../renter/renter.interface";
import { IProperty } from "../property/property.interface";

export enum PropertyContractStatus {
  ACTIVE = "ACTIVE",
  AWAITING_SIGN = "AWAITING_SIGN",
  EXPIRED = "EXPIRED",
}

export interface IPropertyContract {
  _id: string;
  property: IProperty | string;
  renter: IRenter | string;
  document?: string;
  signedAt?: string;
  status: PropertyContractStatus;
  contract: IContract | string;
}
