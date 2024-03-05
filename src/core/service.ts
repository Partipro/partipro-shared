import mongoose, { Types, PopulateOptions } from "mongoose";
import { Find, OptionalType } from "./repository";

export interface Service<I> {
  insert(props: I, { session }: { session?: mongoose.mongo.ClientSession }): Promise<I>;

  list({ filters, withDeleted, populate, sort, select }: Find<I>): Promise<I[]>;

  findById(
    id: string | Types.ObjectId,
    { populate }: { populate?: PopulateOptions; session?: mongoose.mongo.ClientSession },
  ): Promise<I | null>;

  findOne({ filters, withDeleted, populate, sort, select }: Find<I>): Promise<I>;

  update(id: string, { props }: { props: OptionalType<I> }): Promise<I>;

  delete(id: string): Promise<I>;
}
