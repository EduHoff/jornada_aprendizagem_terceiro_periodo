from enum import Enum

class Category(str, Enum):
    # Linha Seca
    GONDOLAS = "Gôndolas"                                     # Fator 1.40
    MOBILIARIOS = "Mobiliários"                               # Fator 1.20 (Mobilias)
    CHECKOUTS = "Checkouts"                                   # Fator 1.00
    RACK_SLIM = "Rack Slim"                                   # Fator 1.20
    PORTA_PALLETS = "Porta Pallets"                           # Fator 1.00
    PORTA_PALLETS_MONTADOS = "Porta Pallets - Montados"       # Fator 1.00
    PORTA_PALLETS_DESMONTADOS = "Porta Pallets - Desmontados" # Fator 4.00

    GONDOLA = "GONDOLA"        
    FURNITURE = "FURNITURE"    
    CHECKOUT = "CHECKOUT"      
    RACK_SLIM = "RACK_SLIM"    
    
    # Refrigerados
    REFRIGERATED = "REFRIGERATED" # Cálculo por C x L x A