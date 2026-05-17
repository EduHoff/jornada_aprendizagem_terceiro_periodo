"use client";

import { styles } from "../styles";
import { ApiService } from "@/application/services/ApiService";
import { useRouter } from "next/navigation";

interface StepFinalProps {
  data: {
    purchaseOrder?: {
      order_number?: string;
      customer_name?: string;
    };

    calculation?: {
      total_volume_m3?: number;
      vehicle_type?: string;
    };

    quote?: {
      total_freight?: number;
    };
  };

  back: () => void;
}

export function StepFinal({
  data,
  back,
}: StepFinalProps) {
  const router = useRouter();

  async function handleSave() {
    try {
      await ApiService.saveOrder({
        ...data.purchaseOrder,
        ...data.calculation,
        ...data.quote,
      });

      alert("Pedido salvo com sucesso");

      router.push("/orcamento");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar");
    }
  }

  return (
    <>
      <div style={styles.stepHeader}>
        <span>Etapa 5 de 5</span>
        <h2>Resumo Final</h2>
      </div>

      <div style={styles.summaryCard}>
        <p>
          <strong>Pedido:</strong>{" "}
          {data.purchaseOrder?.order_number}
        </p>

        <p>
          <strong>Cliente:</strong>{" "}
          {data.purchaseOrder?.customer_name}
        </p>

        <p>
          <strong>Volume:</strong>{" "}
          {data.calculation?.total_volume_m3} m³
        </p>

        <p>
          <strong>Veículo:</strong>{" "}
          {data.calculation?.vehicle_type}
        </p>

        <p>
          <strong>Frete Final:</strong>{" "}
          R$ {data.quote?.total_freight}
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
          onClick={handleSave}
        >
          Confirmar Pedido
        </button>
      </div>
    </>
  );
}