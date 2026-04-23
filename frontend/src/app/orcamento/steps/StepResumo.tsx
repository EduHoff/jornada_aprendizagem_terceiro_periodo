"use client";

import { styles } from "../styles";

export function StepResumo({ data, back }: any) {
  return (
    <>
      <p>Cliente: {data.nome}</p>
      <p>Origem: {data.origem}</p>
      <p>Destino: {data.destino}</p>
      <p>Peso: {data.peso}</p>

      <button style={styles.button}>Confirmar</button>

      <button style={styles.secondaryButton} onClick={back}>
        Voltar
      </button>
    </>
  );
}