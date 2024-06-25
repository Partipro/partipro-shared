import mongoose, { PopulateOptions, Types } from "mongoose";
import { Find, FindPaginate, OptionalType, Repository } from "./repository";
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

  list({ filters, populate, sort, withDeleted, select }: Find<I> = {}): Promise<I[]> {
    return <Promise<I[]>>this.repository.list({ filters, populate, withDeleted, sort, select });
  }

  findOne({ filters, withDeleted, populate, sort, select }: Find<I> = {}): Promise<I> {
    return <Promise<I>>this.repository.findOne({ filters, withDeleted, populate, sort, select });
  }

  async update(id: string, { props }: { props: OptionalType<I> }): Promise<I> {
    return <Promise<I>>this.repository.update(id, { props });
  }

  async disable(id: string): Promise<I> {
    return this.repository.disable(id);
  }

  async restore(id: string): Promise<I> {
    return this.repository.restore(id);
  }

  async paginate(
    { filters, populate, withDeleted, sort, select, page, pageSize = 15 }: FindPaginate<I> = { page: 1 },
  ): Promise<{ data: I[]; total: number }> {
    return this.repository.paginate({ filters, populate, sort, select, withDeleted, page, pageSize });
  }
}
