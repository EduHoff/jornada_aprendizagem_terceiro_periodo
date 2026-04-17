"use client";

import { useState } from "react";
import { styles } from "../styles";

export function StepCliente({ next }: any) {
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");

  function handleNext() {
    if (!nome.trim()) {
      setErro("Nome do cliente é obrigatório");
      return;
    }

    next({ nome });
  }

  return (
    <>
      <input
        style={styles.input}
        placeholder="Nome do Cliente"
        onChange={(e) => setNome(e.target.value)}
      />

      {erro && <span style={{ color: "red" }}>{erro}</span>}

      <button style={styles.button} onClick={handleNext}>
        Próximo
      </button>
    </>
  );
}