import { Model } from "mongoose";
import BaseRepository from "../core/base.repository";
import { IPlan } from "../models/plan/plan.interface";
import Plan from "../models/plan/plan.model";

class PlanRepository extends BaseRepository<IPlan, Model<IPlan>> {
  constructor() {
    super(Plan);
  }
}

export default PlanRepository;
