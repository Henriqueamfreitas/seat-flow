export class User {
  id!: string;
  name!: string;
  email!: string;
  password!: string;
  role!: "admin" | "employee";
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

export type SafeUser = Omit<User, "password">;
