import { VehicleType } from "../enums/VehicleType";

export class Vehicle {
  constructor(
    public capacity_m3: number,
    public type: VehicleType,
    public quantity: number
  ) {}
}