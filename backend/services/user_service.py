from core.database import get_supabase
from core.security import PasswordManager

class UserService:
    def __init__(self):
        self.db = get_supabase()
        self.pwd_manager = PasswordManager()

    def cadastrar_usuario(self, email: str, senha_pura: str, role: str = "operador"):
        hash_senha = self.pwd_manager.hash_password(senha_pura)
        
        dados = {
            "email": email,
            "password_hash": hash_senha,
            "role": role
        }
        
        response = self.db.table("usuarios").insert(dados).execute()
        return response