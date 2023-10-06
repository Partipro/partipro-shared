import { Model, PopulateOptions, Types } from "mongoose";
import { Find, Repository } from "./repository";

export default abstract class BaseRepository<I, M extends Model<I>> implements Repository<I> {
  protected constructor(protected model: M) {}

  async insert(props: I): Promise<I> {
    const newDocument = await this.model.create(props);
    return newDocument.toObject();
  }

  findById(id: string | Types.ObjectId, { populate }: { populate?: PopulateOptions }): Promise<I | null> {
    return <Promise<I | null>>this.model.findById(id, null, { populate }).lean().exec();
  }

  list({ filters, withDeleted = false, populate, sort, select }: Find<I>): Promise<I[]> {
    return <Promise<I[]>>this.model
      .find(
        {
          deleted: withDeleted,
          ...filters,
        },
        null,
        {
          populate,
          select,
          sort: sort || { _id: -1 },
        },
      )
      .lean()
      .exec();
  }

  findOne({ filters, withDeleted, populate, sort }: Find<I>): Promise<I> {
    return <Promise<I>>this.model
      .findOne({ deleted: withDeleted, ...filters }, null, { populate, sort: sort || { _id: -1 } })
      .lean()
      .exec();
  }
}
