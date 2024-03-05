import BaseService from "../core/base.service";
import { IPlan } from "../models/plan/plan.interface";
import PlanRepository from "../repositories/plan.repository";

export class PlanService extends BaseService<IPlan> {
  constructor() {
    super(PlanRepository);
  }
}

export default new PlanService();
