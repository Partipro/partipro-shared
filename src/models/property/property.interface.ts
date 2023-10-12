import { IUser } from "../user/user.interface";
import { IContract } from "../contract/contract.interface";

export interface IProperty {
  name: string;
  city?: string;
  address?: string;
  owner: IUser | string;
  contract?: IContract | string;
  squareMeters?: number;
  monthRent?: number;
}
