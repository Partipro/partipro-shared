export enum PlanHsSku {
  STANDARD = "STANDARD",
}

export interface IPlan {
  _id: string;
  price: number;
  name: string;
  hs_sku: PlanHsSku;
}
