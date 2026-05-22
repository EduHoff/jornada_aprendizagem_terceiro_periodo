"use client";

import { useEffect, useState } from "react";
import { styles } from "../styles";
import { WizardData } from "../types";
import { Routes } from "@/api/Routes";
import { PurchaseOrder } from "@/domain/entities/PurchaseOrder";
import { Vehicle } from "@/domain/entities/Vehicle";
import { VehicleType } from "@/domain/enums/VehicleType";

interface StepVolumetriaProps {
  data: WizardData;
  next: (data: Partial<WizardData>) => void;
  back: () => void;
}

const VEHICLE_CAPACITY: Record<VehicleType, number> = {
  [VehicleType.TRUCK]: 45,
  [VehicleType.CARRETA]: 90,
};

export function StepVolumetria({ data, next, back }: StepVolumetriaProps) {
  const [loading, setLoading] = useState(true);
  const [updatedOrder, setUpdatedOrder] = useState<PurchaseOrder | null>(null);
  const [editableVehicles, setEditableVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    async function calculate() {
      if (!data.purchaseOrder) return;

      try {
        const response = await Routes.calculateOrder(data.purchaseOrder);
        setUpdatedOrder(response);
        setEditableVehicles(response.vehicles);
      } catch (error) {
        console.error(error);
        alert("Erro ao calcular a volumetria e alocação de frota.");
      } finally {
        setLoading(false);
      }
    }

    calculate();
  }, [data.purchaseOrder]);

  function updateVehicleType(
    index: number,
    vehicleType: VehicleType
  ) {
    const updated = [...editableVehicles];

    updated[index].type = vehicleType;

    updated[index].capacity_m3 =
      VEHICLE_CAPACITY[vehicleType];

    setEditableVehicles(updated);
  }

  function increaseQuantity(index: number) {
    const updated = [...editableVehicles];

    updated[index].quantity += 1;

    setEditableVehicles(updated);
  }

  function decreaseQuantity(index: number) {
    const updated = [...editableVehicles];

    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
    }

    setEditableVehicles(updated);
  }

  function addVehicle() {
    const vehicle = new Vehicle(
      VEHICLE_CAPACITY[VehicleType.TRUCK],
      VehicleType.TRUCK,
      1
    );

    setEditableVehicles([
      ...editableVehicles,
      vehicle,
    ]);
  }

  function removeVehicle(index: number) {
    const updated = editableVehicles.filter(
      (_, i) => i !== index
    );

    setEditableVehicles(updated);
  }

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
          <strong>Volume Total:</strong>{" "} {updatedOrder?.total_volume_m3} m³
        </p>

        <hr style={{ margin: "15px 0", border: "0", borderTop: "1px solid #ccc" }} />
        
        <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
          Frota Sugerida para o Transporte:
        </p>

        {editableVehicles.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            {editableVehicles.map((vehicle, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "15px",
                  background: "#f9fafb",
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <label
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Tipo de veículo
                  </label>

                  <select
                    value={vehicle.type}
                    onChange={(e) =>
                      updateVehicleType(
                        index,
                        e.target.value as VehicleType
                      )
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginTop: "5px",
                    }}
                  >
                    {Object.values(VehicleType).map(
                      (type) => (
                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <p>
                  <strong>Capacidade:</strong>{" "}
                  {vehicle.capacity_m3} m³
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <button
                    style={styles.secondaryButton}
                    onClick={() =>
                      decreaseQuantity(index)
                    }
                  >
                    -
                  </button>

                  <strong>
                    {vehicle.quantity}
                  </strong>

                  <button
                    style={styles.button}
                    onClick={() =>
                      increaseQuantity(index)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  style={{
                    marginTop: "10px",
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    padding: "8px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    removeVehicle(index)
                  }
                >
                  Remover veículo
                </button>
              </div>
            ))}

            <button
              style={styles.button}
              onClick={addVehicle}
            >
              + Adicionar Veículo
            </button>
          </div>
        ) : (
          <p style={{ color: "orange" }}>
            Nenhum veículo foi necessário ou
            volume zerado.
          </p>
        )}
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
          onClick={() => {
            if (!updatedOrder) return;

            updatedOrder.vehicles.length = 0;

            editableVehicles.forEach((vehicle) => {
              updatedOrder.add_vehicle(vehicle);
            });

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