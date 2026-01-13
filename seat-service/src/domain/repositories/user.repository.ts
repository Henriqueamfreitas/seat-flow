import { User } from "../entities/user";

export interface IUserRepository {
  create(data: Partial<User>): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findAll(data: IFindAllParams): Promise<IFindAllResponse>;
  update(data: Partial<User>): Promise<User | null>;
  updatePassword(id: string, password: string): Promise<User | null>;
  deactivate(id: string): Promise<boolean | null>;
  activate(id: string): Promise<User | null>;
}

export interface IFindAllParams {
  name?: string,
  email?: string,
  role?: "admin" | "employee",
  page?: number,
  perPage?: number,
}

export interface IFindAllResponse {
  users: User[],
  total: number,
}

/*
👉 Defines what the application needs from persistence

Contracts only

No TypeORM

No Express

No pagination math

📜 “This is the promise.”
*/