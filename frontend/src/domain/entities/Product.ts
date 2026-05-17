import { Category } from "../enums/Category";
import { UnitType } from "../enums/UnitType";

export class Product {
  constructor(
    public code: string,
    public description: string,
    public quantity: number,
    public unit: UnitType,
    public category: Category,

    public items_per_m3: number = 0,

    public length: number = 0,
    public width: number = 0,
    public height: number = 0
  ) {}
}