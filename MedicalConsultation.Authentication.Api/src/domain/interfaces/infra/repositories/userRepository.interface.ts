import { User } from "../../../entities/user";

export interface IUserRepository {
  login(user: string, password: string): Promise<User | null>;
}