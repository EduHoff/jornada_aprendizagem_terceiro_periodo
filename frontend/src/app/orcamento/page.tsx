"use client";

import { useRouter } from "next/navigation";

export default function OrcamentoPage() {
  const router = useRouter();

  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#2c3e50" }}>Área do OPERADOR</h1>
      <p>Bem-vindo ao sistema de orçamentos da FAST.</p>
      <button 
        onClick={() => router.push("/login")}
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        Sair
      </button>
    </div>
  );
}