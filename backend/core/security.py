from argon2 import PasswordHasher

class PasswordManager:
    def __init__(self):
        self.ph = PasswordHasher()

    def hash_password(self, password: str) -> str:
        return self.ph.hash(password)

    def verify_password(self, stored_hash: str, provided_password: str) -> bool:
        try:
            return self.ph.verify(stored_hash, provided_password)
        except Exception:
            return False