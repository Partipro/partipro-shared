import { IUser } from "../user/user.interface";
import { IContract } from "../contract/contract.interface";

export enum PropertyType {
  RESIDENTIAL = "RESIDENTIAL",
  COMMERCIAL = "COMMERCIAL",
}

export interface IProperty {
  name: string;
  city?: string;
  address?: string;
  type: PropertyType;
  owner: IUser | string;
  contract?: IContract | string;
  squareMeters?: number;
  monthRent?: number;
  image?: string;
}
