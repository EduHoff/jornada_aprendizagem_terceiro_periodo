from core.database import get_supabase
from core.security import PasswordManager

def criar_usuario_teste():
    supabase = get_supabase()
    pwd_manager = PasswordManager()
    
    email_dev = "dev-teste@teste.com"
    senha_dev = "admin123"
    
    print(f"--- Iniciando criação do usuário: {email_dev} ---")
    
    senha_hash = pwd_manager.hash_password(senha_dev)
    
    try:
        novo_usuario = {
            "email": email_dev,
            "password_hash": senha_hash,
            "role": "admin"
        }
        
        resultado = supabase.table("usuarios").insert(novo_usuario).execute()
        
        print("\nSUCESSO!")
        print(f"Usuário criado com ID: {resultado.data[0]['id']}")
        print(f"Data de criação: {resultado.data[0]['created_at']}")
        
    except Exception as e:
        print(f"\nERRO AO CRIAR USUÁRIO:")
        print(e)

if __name__ == "__main__":
    criar_usuario_teste()