import { inject, injectable } from "tsyringe";
import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/interfaces/infra/repositories/userRepository.interface";
import { DatabaseConnection } from "../databaseConnetion";
import { UserDatabaseModel } from "../models/userDatabaseModel";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject("DatabaseConnection") private databaseConnection: DatabaseConnection) { }

  async login(user: string, password: string): Promise<User | null> {
    try {
      this.databaseConnection.Connect();
      const model = await UserDatabaseModel.findOne({ email: user, password });
      if (model) {
        const userEntity = new User();
        userEntity.id = model._id.toString();
        userEntity.firstName = model.firstName;
        userEntity.lastName = model.lastName;
        userEntity.email = model.email;
        userEntity.password = model.password;
        userEntity.role = model.role;
        return userEntity;
      }
      return null;
    } catch {
      return null;
    }
  }
}