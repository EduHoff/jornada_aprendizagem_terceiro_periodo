"use client";

import { useState } from "react";
import { styles } from "../styles";
import { WizardData } from "../types";
import { ApiService } from "@/application/services/ApiService";

interface StepUploadPDFProps {
  next: (data: Partial<WizardData>) => void;
}

export function StepUploadPDF({
  next,
}: StepUploadPDFProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file) {
      alert("Selecione um PDF");
      return;
    }

    try {
      setLoading(true);

      const purchaseOrder = await ApiService.uploadPDF(file);

      next({
        purchaseOrder,
      });
    } catch (error) {
      console.error(error);
      alert("Erro ao processar PDF");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div style={styles.stepHeader}>
        <span>Etapa 1 de 5</span>
        <h2>Upload do Pedido</h2>
      </div>

      <div style={styles.uploadContainer}>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
        />
      </div>

      <button
        style={styles.button}
        onClick={handleUpload}
      >
        {loading ? "Processando..." : "Enviar PDF"}
      </button>
    </>
  );
}