"use client";

import { useState } from "react";
import { styles } from "../styles";

export function StepCliente({ next }: any) {
  const [nome, setNome] = useState("");

  return (
    <>
      <input
        style={styles.input}
        placeholder="Nome do Cliente"
        onChange={(e) => setNome(e.target.value)}
      />

      <button style={styles.button} onClick={() => next({ nome })}>
        Próximo
      </button>
    </>
  );
}