import json
from .scanner_interface import ScannerInterface
from domain.entities.purchase_order import PurchaseOrder
from domain.entities.product import Product
from domain.enums.uf import UF
from domain.enums.unit_type import UnitType
from domain.enums.category import Category

class JSONScanner(ScannerInterface):

    def scan(self, file_content: bytes) -> PurchaseOrder:
        data = json.loads(file_content.decode('utf-8'))
        
        uf_abbreviation = data.get("uf", "PR")
        
        order = PurchaseOrder(
            order_number=data.get("order_number", "N/A"),
            customer_name=data.get("customer_name", "Desconhecido"),
            city=data.get("city", "Não informada"),
            uf=UF[uf_abbreviation]
        )

        for item in data.get("items", []):
            code = item.get("code", "")
            
            prefix = code.split('-')[0].upper()
            match prefix:
                case "LSG":
                    category = Category.LSG
                case "MOB":
                    category = Category.MOBILIAS
                case "CKO" | "CK":
                    category = Category.CHECKOUTS
                case "RS":
                    category = Category.RACK_SLIM
                case "PAL":
                    category = Category.PORTA_PALLETS
                case _:
                    category = Category.REFRIGERATED

            product = Product(
                code=code,
                description=item.get("description", ""),
                quantity=item.get("quantity", 0),
                unit=UnitType(item.get("unit", "PC")),
                category=category,
                length=item.get("length", 0.0),
                width=item.get("width", 0.0),
                height=item.get("height", 0.0),
                density_factor=item.get("density_factor", 0.0)
            )
            order.add_item(product)

        return order