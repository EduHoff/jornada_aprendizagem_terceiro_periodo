from domain.enums.category import AssemblyStatus, Category
from domain.enums.unit_type import UnitType
from domain.entities.purchase_order import PurchaseOrder
from infra.repositories.product_repository import ProductRepository

class LogisticsService:
    def __init__(self):
        self.repository = ProductRepository()

    def calculate_total_volume(self, order: PurchaseOrder) -> float:
        descricoes = [item.description.upper() for item in order.items]
        codigos = [item.code for item in order.items]
        
        seca_data, refrig_data = self.repository.get_logistics_data(descricoes, codigos)
        adjustment_factors = self.repository.get_adjustment_factors()

        mapa_seca = {row['nome'].upper(): float(row['qtd_por_m3']) for row in seca_data}
        mapa_fatores = {row['categoria'].upper(): float(row['fator']) for row in adjustment_factors}

        total_volume = 0.0

        for item in order.items:
            volume_item = 0.0
            desc_upper = item.description.upper()

            # --- MÉTODO A: LINHA SECA ---
            if desc_upper in mapa_seca:
                items_per_m3 = mapa_seca[desc_upper]
                
                if items_per_m3 > 0:
                    volume_base = item.quantity / items_per_m3
                    
                    fator_ajuste = mapa_fatores.get(item.category.value.upper(), 1.0)
                    
                    if item.category == Category.PORTA_PALLETS:
                        chave = "DESMONTADO" if item.unit == UnitType.PC else "MONTADO"
                        fator_ajuste = mapa_fatores.get(chave, 1.0)
                    
                    volume_item = volume_base * fator_ajuste
                    print(f"DEBUG: Achou {desc_upper} | Vol: {volume_item}")

            # --- MÉTODO B: REFRIGERADOS ---
            else:
                dados_refrig = next((r for r in refrig_data if r['codigo_atual'] == item.code or r['codigo_antigo'] == item.code), None)
                if dados_refrig:
                    v_unitario = float(dados_refrig['comprimento']) * float(dados_refrig['largura']) * float(dados_refrig['altura'])
                    volume_item = v_unitario * item.quantity

            total_volume += volume_item

        return round(total_volume, 3)