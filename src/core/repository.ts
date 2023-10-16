import mongoose, { Types, PopulateOptions } from "mongoose";

type FilterValue<T, K extends keyof T> =
  | T[K]
  | { $eq: T[K] | null }
  | { $ne: T[K] | null }
  | { $in: T[K][] }
  | { $nin: T[K][] }
  | { $gte: T[K] }
  | { $gt: T[K] }
  | { $lte: T[K] }
  | { $lt: T[K] };

export type Filter<T> = {
  [K in keyof T]?: FilterValue<T, K>;
} & {
  $or?: Filter<T>[];
  $and?: Filter<T>[];
};

export type Find<I> = {
  filters?: Filter<I>;
  withDeleted?: boolean;
  populate?: PopulateOptions;
  sort?: { [key in keyof I]?: -1 | 1 };
  select?: string | string[] | Record<string, number | boolean | object>;
};

export interface Repository<I> {
  insert(props: I, { session }: { session?: mongoose.mongo.ClientSession }): Promise<I>;

  list({ filters, withDeleted, populate, sort, select }: Find<I>): Promise<I[]>;

  findById(
    id: string | Types.ObjectId,
    { populate }: { populate?: PopulateOptions; session?: mongoose.mongo.ClientSession },
  ): Promise<I | null>;

  findOne({ filters, withDeleted, populate, sort, select }: Find<I>): Promise<I>;
}
