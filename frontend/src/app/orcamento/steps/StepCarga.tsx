"use client";

import { useState } from "react";
import { styles } from "../styles";

export function StepCarga({ next, back }: any) {
  const [peso, setPeso] = useState("");

  function handleNext() {
    if (!peso || Number(peso) <= 0) {
      alert("Peso inválido");
      return;
    }

    next({ peso });
  }

  return (
    <>
      <input
        style={styles.input}
        placeholder="Peso da carga"
        onChange={(e) => setPeso(e.target.value)}
      />

      <button style={styles.button} onClick={handleNext}>
        Próximo
      </button>

      <button style={styles.secondaryButton} onClick={back}>
        Voltar
      </button>
    </>
  );
}