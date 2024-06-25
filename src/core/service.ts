import mongoose, { Types, PopulateOptions } from "mongoose";
import { Find, FindPaginate, OptionalType } from "./repository";

export interface Service<I> {
  insert(props: I, { session }: { session?: mongoose.mongo.ClientSession }): Promise<I>;

  list({ filters, withDeleted, populate, sort, select }: Find<I>): Promise<I[]>;

  findById(
    id: string | Types.ObjectId,
    { populate }: { populate?: PopulateOptions; session?: mongoose.mongo.ClientSession },
  ): Promise<I | null>;

  findOne({ filters, withDeleted, populate, sort, select }: Find<I>): Promise<I>;

  update(id: string, { props }: { props: OptionalType<I> }): Promise<I>;

  disable(id: string): Promise<I>;

  restore(id: string): Promise<I>;

  paginate({
    filters,
    withDeleted,
    populate,
    sort,
    select,
    page,
    pageSize = 15,
  }: FindPaginate<I>): Promise<{ data: I[]; total: number }>;
}
