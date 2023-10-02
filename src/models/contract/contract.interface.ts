import { IPlan } from "../plan/plan.interface";

export interface IContract {
  plan: string | IPlan;
  documentNumber?: string;
  socialReason?: string;
}
