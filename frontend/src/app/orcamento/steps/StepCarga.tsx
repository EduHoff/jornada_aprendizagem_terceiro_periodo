"use client";

import { useState } from "react";
import { styles } from "../styles";

export function StepCarga({ next, back }: any) {
  const [peso, setPeso] = useState("");

  return (
    <>
      <input
        style={styles.input}
        placeholder="Peso da carga"
        onChange={(e) => setPeso(e.target.value)}
      />

      <button style={styles.button} onClick={() => next({ peso })}>
        Próximo
      </button>

      <button style={styles.secondaryButton} onClick={back}>
        Voltar
      </button>
    </>
  );
}