"use client";

import { styles } from "../styles";
import { ApiService } from "@/application/services/ApiService";
import { useEffect, useState } from "react";
import { WizardData } from "../types";

interface StepVolumetriaProps {
  data: WizardData;
  next: (data: Partial<WizardData>) => void;
  back: () => void;
}

export function StepVolumetria({
  data,
  next,
  back,
}: StepVolumetriaProps) {
  const [loading, setLoading] = useState(true);

  const [result, setResult] = useState<WizardData["calculation"] | null>(null);

  useEffect(() => {
    async function calculate() {
      try {
        const response =
          await ApiService.calculateOrder(
            data.purchaseOrder
          );

        setResult(response);
      } catch (error) {
        console.error(error);
        alert("Erro ao calcular");
      } finally {
        setLoading(false);
      }
    }

    calculate();
  }, [data.purchaseOrder]);

  if (loading) {
    return <p>Calculando...</p>;
  }

  return (
    <>
      <div style={styles.stepHeader}>
        <span>Etapa 3 de 5</span>
        <h2>Volumetria</h2>
      </div>

      <div style={styles.summaryCard}>
        <p>
          <strong>Volume Total:</strong>{" "}
          {result.total_volume_m3} m³
        </p>

        <p>
          <strong>Veículo sugerido:</strong>{" "}
          {result.vehicle_type}
        </p>

        <p>
          <strong>Qtd Veículos:</strong>{" "}
          {result.vehicle_quantity}
        </p>
      </div>

      <div style={styles.buttonGroup}>
        <button
          style={styles.secondaryButton}
          onClick={back}
        >
          Voltar
        </button>

        <button
          style={styles.button}
          onClick={() =>
            next({
              calculation: result,
            })
          }
        >
          Próximo
        </button>
      </div>
    </>
  );
}