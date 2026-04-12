import { User } from "src/domain/entities/User";

export class UserRepository {
  private users: User[] = [];

  async save(user: User) {
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string) {
    return this.users.find(u => u.getEmail() === email);
  }
}