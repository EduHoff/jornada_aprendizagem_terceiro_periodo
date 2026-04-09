from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.security import PasswordManager

#comando útil: http://localhost:8000/docs
pwd_manager = PasswordManager()

def create_app() -> FastAPI:
    
    app = FastAPI(title="MyApp API")
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], 
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/api/test-auth")
    def test_auth():
        senha = "senha123"
        hash_str = pwd_manager.hash_password(senha)
        valido = pwd_manager.verify_password(hash_str, senha)
        
        return {
            "status": "Conectado com security.py!",
            "hash_gerado": hash_str,
            "validacao": valido
        }

    return app


app = create_app()
