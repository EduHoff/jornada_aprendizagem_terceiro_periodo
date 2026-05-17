import { PurchaseOrder } from "@/domain/entities/PurchaseOrder";

export interface CalculationResult {
  total_volume_m3: number;
  vehicle_type: string;
  vehicle_quantity: number;
}

export interface QuoteResult {
  base_freight: number;
  icms: number;
  toll: number;
  total_freight: number;
}

export interface WizardData {
  purchaseOrder?: PurchaseOrder;
  calculation?: CalculationResult;
  quote?: QuoteResult;
}