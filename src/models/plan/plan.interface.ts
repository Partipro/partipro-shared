export enum PlanHsSku {
  FREE = "FREE",
  STANDARD = "STANDARD",
}

export interface IPlan {
  _id: string;
  price: number;
  name: string;
  hs_sku: PlanHsSku;
}
