import { User } from "src/domain/entities/User";
import { UserRole } from "src/domain/enums/UserRole";
import { UserRepository } from "src/infra/repositories/UserRepository";

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