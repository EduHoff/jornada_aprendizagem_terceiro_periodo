from typing import List
from .product import Product
from domain.enums.uf import UF 

class PurchaseOrder:
    def __init__(self, order_number: str, customer_name: str, city: str, uf: UF):
        self._order_number = order_number
        self._customer_name = customer_name
        self._city = city
        self._uf = uf
        self._items: List[Product] = []

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
    def items(self) -> List[Product]:
        return self._items

    def add_item(self, product: Product):
        self._items.append(product)

    @property
    def total_products_quantity(self) -> int:
        return sum(item.quantity for item in self._items)