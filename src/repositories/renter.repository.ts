import { Model } from "mongoose";
import BaseRepository from "../core/base.repository";
import { IRenter } from "../models/renter/renter.interface";
import Renter from "../models/renter/renter.model";

class RenterRepository extends BaseRepository<IRenter, Model<IRenter>> {
  constructor() {
    super(Renter);
  }
}

export default RenterRepository;
