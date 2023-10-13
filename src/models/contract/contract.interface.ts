import { IPlan } from "../plan/plan.interface";

export interface IContract {
  _id: string;
  plan: string | IPlan;
  documentNumber?: string;
  socialReason?: string;
}
