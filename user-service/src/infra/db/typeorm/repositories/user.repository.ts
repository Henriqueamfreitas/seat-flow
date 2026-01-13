import { IFindAllParams, IFindAllResponse, IUserRepository } from "../../../../domain/repositories/user.repository";
import { UserEntity } from "../entities/user.entity";
import { AppDataSource } from "../database";
import { User } from "../../../../domain/entities/user";
import { ILike, In } from "typeorm";

export class UserRepository implements IUserRepository {
  private ormRepo = AppDataSource.getRepository(UserEntity);

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepo.findOne({ where: { email } });
    return user;
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.ormRepo.create(data);
    const saved = await this.ormRepo.save(user);
    return saved;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.ormRepo.findOne({ where: { id } })
    return user
  }

  async findAll(data: IFindAllParams): Promise<IFindAllResponse> {
    const where: any = {}
    if (data.name) where.name = ILike(`%${data.name}%`);
    if (data.email) where.email = ILike(`%${data.email}%`);
    if (data.role) where.role = data.role

    const perPage = data.perPage || 10
    const page = data.page || 1

    const [users, total] = await this.ormRepo.findAndCount({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
      order: {
        createdAt: 'DESC'
      }
    })

    return { users, total }
  }

  async update(data: Partial<User>): Promise<User | null> {
    const user = await this.ormRepo.findOne({ where: { id: data.id } });

    if (!user) return null;

    const updatedUser = this.ormRepo.merge(user, data);

    return await this.ormRepo.save(updatedUser);
  }

  async updatePassword(id: string, password: string): Promise<User | null> {
    const user = await this.ormRepo.findOne({ where: { id: id } })

    if (!user) return null

    user.password = password;

    return await this.ormRepo.save(user);
  }

  async deactivate(id: string): Promise<boolean | null> {
    const user = await this.ormRepo.findOne({ where: { id: id } })

    if (!user) return null

    const result = await this.ormRepo.update(
      { id },
      { isActive: false }
    );

    return result.affected === 1;
  }

  async activate(id: string): Promise<User | null> {
    const user = await this.ormRepo.findOne({ where: { id: id } })

    if (!user) return null

    const updatedUser = this.ormRepo.merge(user, { isActive: true });

    return await this.ormRepo.save(updatedUser);
  }


}
