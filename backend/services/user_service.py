from core.database import get_supabase
from core.security import PasswordManager
from datetime import datetime

class UserService:
    def __init__(self):
        self.db = get_supabase()
        self.pwd_manager = PasswordManager()

    async def create_user(self, data):
        hashed_password = self.pwd_manager.hash_password(data.password)

        user_data = {
            "nome": data.name,
            "email": data.email,
            "senha_hash": hashed_password,
            "role": data.role
        }

        response = self.db.table("usuarios").insert(user_data).execute()

        if response.data:
            return response.data[0]
        return None
    
    def verify_user_password(self, plain_password: str, hashed_password: str) -> bool:
        return self.pwd_manager.verify_password(plain_password, hashed_password)

    async def get_by_email(self, email: str):
        response = self.db.table("usuarios").select("*").eq("email", email).execute()
        
        if response.data:
            return response.data[0]
        return None
    
    async def update_last_login(self, user_id: str):
        try:
            now = datetime.now().isoformat()
            self.db.table("usuarios").update({"last_login": now}).eq("id", user_id).execute()
        except Exception as e:
            print(f"Erro ao atualizar last_login: {e}")