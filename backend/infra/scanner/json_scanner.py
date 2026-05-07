from .scanner_interface import ScannerInterface
import json

class JSONScanner(ScannerInterface):

    def scan(self, file_content: bytes):
        
        raw_text = json.loads(file_content.decode('utf-8'))
        
        # aqui vai ser tratado os dados desejados

        return {
            "source": "JSON",
            "raw_data": raw_text,
            "items": []
        }