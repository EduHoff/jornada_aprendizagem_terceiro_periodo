from typing import List
from domain.enums.category import Category
from domain.enums.unit_type import UnitType
from domain.enums.vehicle_type import VehicleType
from domain.entities.vehicle import Vehicle
from .product import Product
from domain.enums.uf import UF 

class PurchaseOrder:
    def __init__(self, order_number: str, customer_name: str, city: str, uf: UF, created_by_id: str, total_volume_m3: float):
        self._order_number = order_number
        self._customer_name = customer_name
        self._city = city
        self._uf = uf
        self._created_by_id = created_by_id
        self._total_volume_m3 = total_volume_m3
        self._items: List[Product] = []
        self._vehicles: List[Vehicle] = []

    @property
    def order_number(self) -> str:
        return self._order_number

    @property
    def customer_name(self) -> str:
        return self._customer_name

    @property
    def city(self) -> str:
        return self._city

    @property
    def uf(self) -> UF:
        return self._uf
    
    @property
    def created_by_id(self) -> str:
        return self._created_by_id
    
    @property
    def total_volume_m3(self) -> str:
        return self._total_volume_m3

    @property
    def items(self) -> List[Product]:
        return self._items
    
    @property
    def vehicles(self) -> List[Vehicle]:
        return self._vehicles

    def add_item(self, product: Product):
        self._items.append(product)
    
    def add_vehicle(self, vehicle: Vehicle):
        self._vehicles.append(vehicle)

    @property
    def total_products_quantity(self) -> int:
        return sum(item.quantity for item in self._items)
    
    def to_dict(self):
        return {
            "order_number": self.order_number,
            "customer_name": self.customer_name,
            "city": self.city,
            "uf": self.uf.abbreviation,
            "created_by_id": self.created_by_id,
            "total_volume_m3": self.total_volume_m3,
            "items": [
                {
                    "code": item.code,
                    "description": item.description,
                    "quantity": item.quantity,
                    "unit": item.unit.name,
                    "category": item.category.value
                } for item in self.items
            ],
            "vehicles": [v.to_dict() for v in self.vehicles]
        }
    
    @staticmethod
    def from_dict(data: dict) -> 'PurchaseOrder':

        order = PurchaseOrder(
            order_number=data["order_number"],
            customer_name=data["customer_name"],
            city=data["city"],
            uf=UF[data["uf"]],
            created_by_id=data["created_by_id"],
            total_volume_m3=float(data["total_volume_m3"])
        )

        for item in data.get("items", []):
            product = Product(
                code=item["code"],
                description=item["description"],
                quantity=int(item["quantity"]),
                unit=UnitType(item["unit"]),
                category=Category(item["category"])
            )
            order.add_item(product)

        for v in data.get("vehicles", []):
            vehicle = Vehicle(
                capacity_m3=float(v["capacity_m3"]),
                type=VehicleType(v["type"]),
                quantity=int(v["quantity"])
            )
            order.add_vehicle(vehicle)

        return order