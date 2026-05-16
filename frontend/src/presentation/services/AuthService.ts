import { UserRepository } from "infra/repositories/UserRepository";
import { CreateUserUseCase } from "application/use-cases/CreateUserUseCase";
import { LoginUserUseCase } from "application/use-cases/LoginUserUseCase";
import { CreateUserDTO } from "application/dtos/CreateUserDTO";

export class AuthService {
  private repository = new UserRepository();

  async register(data: CreateUserDTO) {
    const useCase = new CreateUserUseCase(this.repository);
    return await useCase.execute(data);
  }

  async login(email: string, password: string) {
    const useCase = new LoginUserUseCase(this.repository);
    return await useCase.execute(email, password);
  }
}