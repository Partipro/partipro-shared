import mongoose, { PopulateOptions, Types } from "mongoose";
import { Find, OptionalType, Repository } from "./repository";
import { Service } from "./service";

export default abstract class BaseService<I> implements Service<I> {
  protected constructor(protected repository: Repository<I>) {}

  async insert(props: I, { session }: { session?: mongoose.mongo.ClientSession } = {}): Promise<I> {
    return this.repository.insert(props, { session });
  }

  findById(
    id: string | Types.ObjectId,
    { populate, session }: { populate?: PopulateOptions; session?: mongoose.mongo.ClientSession } = {},
  ): Promise<I | null> {
    return <Promise<I | null>>this.repository.findById(id, { populate, session });
  }

  list({ filters, populate, sort, select }: Find<I> = {}): Promise<I[]> {
    return <Promise<I[]>>this.repository.list({ filters, populate, sort, select });
  }

  findOne({ filters, withDeleted, populate, sort, select }: Find<I> = {}): Promise<I> {
    return <Promise<I>>this.repository.findOne({ filters, withDeleted, populate, sort, select });
  }

  async update(id: string, { props }: { props: OptionalType<I> }): Promise<I> {
    return <Promise<I>>this.repository.update(id, { props });
  }

  async delete(id: string): Promise<I> {
    return this.repository.delete(id);
  }
}
