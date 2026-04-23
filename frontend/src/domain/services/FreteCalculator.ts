export class FreteCalculator {
    // Mock de distâncias
    private static distancias: Record<string, number> = {
      "Curitiba-São Paulo": 408,
      "Curitiba-Rio de Janeiro": 852,
      "Curitiba-Florianópolis": 300,
    };
  
    static calcularDistancia(origem: string, destino: string): number {
      const chave = `${origem}-${destino}`;
      return this.distancias[chave] || 100; // fallback mock
    }
  
    static calcularFrete(km: number, peso: number): number {
      const custoPorKm = 5; // mock
      const taxaPeso = Number(peso) * 0.5;
  
      return km * custoPorKm + taxaPeso;
    }
  }