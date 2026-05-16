import { Product } from "./Product";
import { Vehicle } from "./Vehicle";
import { UF } from "../enums//UF";

export class PurchaseOrder {
  constructor(
    public order_number: string,
    public customer_name: string,
    public city: string,
    public uf: UF,
    public created_by_id: string,

    public total_volume_m3: number,

    public total_freight: number = 0,

    public items: Product[] = [],

    public vehicles: Vehicle[] = []
  ) {}
}