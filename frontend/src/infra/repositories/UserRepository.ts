import { User } from "src/domain/entities/User";
import { UserRole } from "src/domain/enums/UserRole";

export class UserRepository {
  private apiUrl = "http://localhost:8000"; 

  async save(user: User): Promise<User> {
    const response = await fetch(`${this.apiUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        role: user.getRole().toLowerCase()
      }),
    });

    if (!response.ok) throw new Error("Erro ao registrar usuário");
    
    const data = await response.json();
    return new User(data.nome, "x", data.email, data.role as UserRole);
  }

  async login(email: string, password: string): Promise<User> {
    const response = await fetch(`${this.apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Usuário ou senha incorretos");
    }

    const data = await response.json();

    localStorage.setItem("token", data.access_token);

    localStorage.setItem("user", JSON.stringify(data.user));

    const u = data.user;
    return new User(u.nome, u.email, "x", u.role as UserRole);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const response = await fetch(`${this.apiUrl}/users/${email}`);
    
    if (response.status === 404) return undefined;
    
    const data = await response.json();
    return new User(data.nome, data.email, "x", data.role as UserRole);
  }
}