"use client";

import { useEffect, useState } from "react";
import { styles } from "../styles";
import { WizardData } from "../types";

import { ApiService } from "@/application/services/ApiService";

interface StepFreteProps {
  data: WizardData;
  next: (data: Partial<WizardData>) => void;
  back: () => void;
}

export function StepFrete({
  data,
  next,
  back,
}: StepFreteProps) {
  const [quote, setQuote] = useState<WizardData["quote"] | null>(null);

  useEffect(() => {
    async function quoteOrder() {
      try {
        const response =
          await ApiService.quoteOrder({
            ...data.purchaseOrder,
            ...data.calculation,
          });

        setQuote(response);
      } catch (error) {
        console.error(error);
      }
    }

    quoteOrder();
  }, [data.purchaseOrder, data.calculation]);

  if (!quote) {
    return <p>Calculando frete...</p>;
  }

  return (
    <>
      <div style={styles.stepHeader}>
        <span>Etapa 4 de 5</span>
        <h2>Cálculo de Frete</h2>
      </div>

      <div style={styles.summaryCard}>
        <p>
          <strong>Frete Base:</strong>{" "}
          R$ {quote.base_freight}
        </p>

        <p>
          <strong>ICMS:</strong>{" "}
          R$ {quote.icms}
        </p>

        <p>
          <strong>Pedágio:</strong>{" "}
          R$ {quote.toll}
        </p>

        <hr />

        <p>
          <strong>Total:</strong>{" "}
          R$ {quote.total_freight}
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
              quote,
            })
          }
        >
          Próximo
        </button>
      </div>
    </>
  );
}