import { UserRepository } from "src/infra/repositories/UserRepository";

export class LoginUserUseCase {
  constructor(private repository: UserRepository) {}

  async execute(email: string, password: string) {
    const user = await this.repository.login(email, password);

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    return user;
  }
}