import io
from PyPDF2 import PdfReader
from .scanner_interface import ScannerInterface

class PDFScanner(ScannerInterface):

    def scan(self, file_content: bytes):

        file_stream = io.BytesIO(file_content)
        
        reader = PdfReader(file_stream)
        
        raw_text = ""
        
        
        for page in reader.pages:
            raw_text += page.extract_text()

        # aqui vai ficar algum tipo de REGEX para extrair a informação necessária
        
        return {
            "source": "PDF",
            "raw_text": raw_text,
            "items": []
        }