import { UserRole } from "../enums/UserRole";

export class User {
  constructor(
    private name: string,
    private email: string,
    private password: string,
    private role: UserRole
  ) {}

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getRole(): UserRole {
    return this.role;
  }

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }
}