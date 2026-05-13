from domain.enums.unit_type import UnitType
from domain.enums.category import Category

class Product:
    def __init__(
        self, 
        code: str, 
        description: str, 
        quantity: int, 
        unit: UnitType, 
        category: Category,
        items_per_m3: float = 0.0,  # Qtd/m3 (Method A)
        length: float = 0.0,          # (Method B)
        width: float = 0.0,           # (Method B)
        height: float = 0.0           # (Method B)
    ):
        self._code = code
        self._description = description
        self._quantity = quantity
        self._unit = unit
        self._category = category
        self._items_per_m3 = items_per_m3
        self._length = length
        self._width = width
        self._height = height

    @property
    def code(self): return self._code
    
    @property
    def description(self): return self._description
    
    @property
    def quantity(self): return self._quantity
    
    @property
    def unit(self): return self._unit
    
    @property
    def category(self): return self._category

    @property
    def items_per_m3(self): return self._items_per_m3

    @quantity.setter
    def quantity(self, value):
        if value < 0:
            raise ValueError("Quantity cannot be negative")
        self._quantity = value