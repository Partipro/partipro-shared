import BaseInterface from "../BaseInterface";

export enum PlanHsSku {
  FREE = "FREE",
  STANDARD = "STANDARD",
}

export interface IPlan extends BaseInterface {
  _id: string;
  price: number;
  name: string;
  hs_sku: PlanHsSku;
}
