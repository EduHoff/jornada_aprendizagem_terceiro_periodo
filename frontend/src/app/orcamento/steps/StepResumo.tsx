"use client";

import { styles } from "../styles";
import { FreteCalculator } from "src/domain/services/FreteCalculator";

export function StepResumo({ data, back }: any) {
  const km = FreteCalculator.calcularDistancia(
    data.origem,
    data.destino
  );

  const custo = FreteCalculator.calcularFrete(
    km,
    Number(data.peso)
  );

  return (
    <>
      <div style={styles.summaryCard}>
        <p><strong>Cliente:</strong> {data.nome}</p>
        <p><strong>Origem:</strong> {data.origem}</p>
        <p><strong>Destino:</strong> {data.destino}</p>
        <p><strong>Peso:</strong> {data.peso} kg</p>

        <hr />

        <p><strong>Distância:</strong> {km} km</p>
        <p><strong>Custo estimado:</strong> R$ {custo.toFixed(2)} </p>
      </div>

      <button style={styles.button}>Confirmar</button>

      <button style={styles.secondaryButton} onClick={back}>
        Voltar
      </button>
    </>
  );
}