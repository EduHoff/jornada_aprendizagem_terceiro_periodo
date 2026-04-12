import { UserRepository } from "src/infra/repositories/UserRepository";

export class LoginUserUseCase {
  constructor(private repository: UserRepository) {}

  async execute(email: string, password: string) {
    const user = await this.repository.findByEmail(email);

    if (!user || user.getPassword() !== password) {
      throw new Error("Credenciais inválidas");
    }

    return user;
  }
}