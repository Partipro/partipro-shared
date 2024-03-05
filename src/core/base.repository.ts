import mongoose, { AggregateOptions, Model, PipelineStage, PopulateOptions, Types } from "mongoose";
import { Find, OptionalType, Repository, Result } from "./repository";

export default abstract class BaseRepository<I> implements Repository<I> {
  protected constructor(protected model: Model<I>) {}

  async insert(props: I, { session }: { session?: mongoose.mongo.ClientSession } = {}): Promise<I> {
    if (session) {
      return this.model.create([props], { session }).then((data) => data[0].toObject());
    }
    const newDocument = await this.model.create(props);
    return newDocument.toObject();
  }

  findById(
    id: string | Types.ObjectId,
    { populate, session }: { populate?: PopulateOptions; session?: mongoose.mongo.ClientSession } = {},
  ): Promise<I | null> {
    return <Promise<I | null>>this.model
      .findById(id, null, { populate })
      .session(session || null)
      .lean()
      .exec();
  }

  list({ filters, populate, sort, select }: Find<I> = {}): Promise<I[]> {
    return <Promise<I[]>>this.model
      .find({ ...filters }, null, {
        populate,
        select,
        sort: sort || { _id: -1 },
      })
      .lean()
      .exec();
  }

  findOne({ filters, withDeleted, populate, sort, select }: Find<I> = {}): Promise<I> {
    return <Promise<I>>this.model
      .findOne({ deleted: withDeleted, ...filters }, null, { populate, sort: sort || { _id: -1 } })
      .select(select || {})
      .lean()
      .exec();
  }

  async update(id: string, { props }: { props: OptionalType<I> }): Promise<I> {
    await this.model.updateOne({ _id: id }, props).lean();
    return <Promise<I>>this.model.findById({ _id: id }).lean().exec();
  }

  async delete(id: string): Promise<I> {
    const document = <Promise<I>>this.model.findById(id).lean().exec();
    await this.model.deleteOne({ _id: id }).exec();
    return document;
  }

  aggregate<T = Result<I>>(pipeline: PipelineStage[], options?: AggregateOptions): Promise<T[]> {
    return <Promise<T[]>>this.model.aggregate(pipeline, options).exec();
  }
}
