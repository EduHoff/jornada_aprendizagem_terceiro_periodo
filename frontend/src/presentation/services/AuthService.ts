import { UserRepository } from "src/infra/repositories/UserRepository";
import { CreateUserUseCase } from "src/application/use-cases/CreateUserUseCase";
import { LoginUserUseCase } from "src/application/use-cases/LoginUserUseCase";

export class AuthService {
  private repository = new UserRepository();

  async register(data: any) {
    const useCase = new CreateUserUseCase(this.repository);
    return await useCase.execute(data);
  }

  async login(email: string, password: string) {
    const useCase = new LoginUserUseCase(this.repository);
    return await useCase.execute(email, password);
  }
}