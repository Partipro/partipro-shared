import { IContract } from "../contract/contract.interface";
import { IRenter } from "../renter/renter.interface";

export interface IPropertyContract {
  occupations: { from: string; to?: string; renter: IRenter | string }[];
  active: boolean;
  contract: IContract | string;
}
