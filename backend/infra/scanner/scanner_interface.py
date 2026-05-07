from abc import ABC, abstractmethod

class ScannerInterface(ABC):

    @abstractmethod
    def scan(self, file_content: bytes, **kwargs):
        pass