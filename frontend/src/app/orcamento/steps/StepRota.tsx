"use client";

import { useState } from "react";
import { styles } from "../styles";

export function StepRota({ next, back }: any) {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");

  function handleNext() {
    if (!origem || !destino) {
      alert("Preencha origem e destino");
      return;
    }

    next({ origem, destino });
  }

  return (
    <>
      <input
        style={styles.input}
        placeholder="Origem"
        onChange={(e) => setOrigem(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Destino"
        onChange={(e) => setDestino(e.target.value)}
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