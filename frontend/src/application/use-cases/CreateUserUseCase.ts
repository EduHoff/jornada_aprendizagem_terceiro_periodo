import { User } from "domain/entities/User";
import { UserRole } from "domain/enums/UserRole";
import { UserRepository } from "infra/repositories/UserRepository";

export class CreateUserUseCase {
  constructor(private repository: UserRepository) {}

  async execute(data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }) {
    const user = new User(
      data.name,
      data.email,
      data.password,
      data.role
    );

    return await this.repository.save(user);
  }
}