import { IPlan } from "../plan/plan.interface";
import BaseInterface from "../BaseInterface";

export interface IContract extends BaseInterface {
  plan: string | IPlan;
  documentNumber?: string;
  socialReason?: string;
}
