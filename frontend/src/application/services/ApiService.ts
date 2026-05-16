const API_URL = "http://localhost:8000";

export class ApiService {
  static async uploadPDF(file: File) {
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

  static async calculateOrder(data: any) {
    const response = await fetch(`${API_URL}/orders/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  static async quoteOrder(data: any) {
    const response = await fetch(`${API_URL}/orders/quote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  static async saveOrder(data: any) {
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