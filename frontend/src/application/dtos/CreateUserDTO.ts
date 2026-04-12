import { UserRole } from "src/domain/enums/UserRole";

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}