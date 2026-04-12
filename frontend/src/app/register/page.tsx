"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "src/presentation/services/AuthService";
import { UserRole } from "src/domain/enums/UserRole";

export default function RegisterPage() {
 const router = useRouter();
 const authService = new AuthService();

 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [role, setRole] = useState<UserRole>(UserRole.OPERATOR);

 async function handleRegister() {
   await authService.register({ name, email, password, role });
   router.push("/login");
 }

 return (
    <div style={{ padding: 40 }}>
      <h1>Criar Conta</h1>

      <input
        placeholder="Nome"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />

      <br />

      <input
        placeholder="Email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />

      <br />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />

      <br />

      <select
        onChange={(e) => setRole(e.target.value as UserRole)}
      >
        <option value="OPERATOR">Operador</option>
        <option value="ADMIN">Administrador</option>
      </select>

      <br /><br />

      <button onClick={handleRegister}>Criar conta</button>
    </div>
  );
}
