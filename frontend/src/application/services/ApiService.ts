const API_URL = "http://localhost:8000";

import {
  CalculationResult,
  QuoteResult,
} from "@/app/orcamento/types";

import { PurchaseOrder } from "@/domain/entities/PurchaseOrder";

export class ApiService {
  static async uploadPDF(file: File): Promise<PurchaseOrder> {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(`${API_URL}/scan`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erro ao processar PDF");
    }

    return response.json();
  }

  static async calculateOrder(data: PurchaseOrder): Promise<CalculationResult> {
    const response = await fetch(`${API_URL}/orders/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  static async quoteOrder(data: PurchaseOrder): Promise<QuoteResult> {
    const response = await fetch(`${API_URL}/orders/quote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  static async saveOrder(data: PurchaseOrder): Promise<PurchaseOrder> {
    const response = await fetch(`${API_URL}/orders/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }
}