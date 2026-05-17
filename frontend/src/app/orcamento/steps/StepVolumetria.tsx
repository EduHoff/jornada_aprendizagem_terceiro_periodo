"use client";

import { useEffect, useState } from "react";
import { styles } from "../styles";
import { WizardData } from "../types";
import { Routes } from "@/api/Routes";
import { PurchaseOrder } from "@/domain/entities/PurchaseOrder";

interface StepVolumetriaProps {
  data: WizardData;
  next: (data: Partial<WizardData>) => void;
  back: () => void;
}

export function StepVolumetria({ data, next, back }: StepVolumetriaProps) {
  const [loading, setLoading] = useState(true);
  const [updatedOrder, setUpdatedOrder] = useState<PurchaseOrder | null>(null);

  useEffect(() => {
    async function calculate() {
      if (!data.purchaseOrder) return;

      try {
        const response = await Routes.calculateOrder(data.purchaseOrder);
        setUpdatedOrder(response);
      } catch (error) {
        console.error(error);
        alert("Erro ao calcular a volumetria e alocação de frota.");
      } finally {
        setLoading(false);
      }
    }

    calculate();
  }, [data.purchaseOrder]);

  if (loading) {
    return <p style={{ textAlign: "center", padding: "20px" }}>Processando cubagem e alocando frota...</p>;
  }

  return (
    <>
      <div style={styles.stepHeader}>
        <span>Etapa 3 de 5</span>
        <h2>Volumetria e Frota</h2>
      </div>

      <div style={styles.summaryCard}>
        <p>
          <strong>Volume Total:</strong> {updatedOrder?.total_volume_m3} m³
        </p>

        <hr style={{ margin: "15px 0", border: "0", borderTop: "1px solid #ccc" }} />
        
        <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
          Frota Sugerida para o Transporte:
        </p>

        {updatedOrder && updatedOrder.vehicles.length > 0 ? (
          <ul style={{ paddingLeft: "20px", margin: "5px 0" }}>
            {updatedOrder.vehicles.map((vehicle, index) => (
              <li key={index} style={{ marginBottom: "5px" }}>
                <strong>{vehicle.quantity}x</strong> Tipo: {vehicle.type} (Capacidade: {vehicle.capacity_m3} m³)
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "orange" }}>Nenhum veículo foi necessário ou volume zerado.</p>
        )}
      </div>

      <div style={styles.buttonGroup}>
        <button style={styles.secondaryButton} onClick={back}>
          Voltar
        </button>

        <button
          style={styles.button}
          onClick={() => {
            if (!updatedOrder) return;

            next({
              purchaseOrder: updatedOrder,
            });
          }}
        >
          Ir para o Frete
        </button>
      </div>
    </>
  );
}