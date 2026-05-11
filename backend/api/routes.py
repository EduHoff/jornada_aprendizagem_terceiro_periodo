from fastapi import APIRouter, File, HTTPException, UploadFile
from pydantic import BaseModel, ConfigDict, Field, EmailStr
from domain.entities.purchase_order import PurchaseOrder
from infra.scanner.json_scanner import JSONScanner
from infra.scanner.pdf_scanner import PDFScanner
from infra.scanner.scanner_interface import ScannerInterface
from core.security import create_access_token
from services.user_service import UserService

router = APIRouter()
user_service = UserService()

class UserSchema(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    
    name: str = Field(..., min_length=1, description="O nome não pode ser vazio.")
    email: EmailStr = Field(..., description="Deve ser um e-mail válido.")
    password: str = Field(..., min_length=6, description="A senha deve ter no mínimo 6 caracteres.")
    role: str = Field(..., min_length=1)

class LoginSchema(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    
    email: EmailStr = Field(..., description="E-mail do usuário.")
    password: str = Field(..., min_length=1, description="Senha do usuário.")

@router.post("/register")
async def register(data: UserSchema):
    user = await user_service.create_user(data)
    if not user:
        raise HTTPException(status_code=400, detail="Erro ao criar usuário.")
    return user

@router.get("/users/{email}")
async def get_user(email: str):
    user = await user_service.get_by_email(email)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    return user

@router.post("/login")
async def login(credentials: LoginSchema):
    email = credentials.email.strip()
    password = credentials.password.strip()
    
    user = await user_service.get_by_email(email)
    
    if not user:
        raise HTTPException(status_code=401, detail="E-mail ou senha incorretos.")

    is_valid = user_service.verify_user_password(password, user.password)
    
    if not is_valid:
        raise HTTPException(status_code=401, detail="E-mail ou senha incorretos.")
    
    token = create_access_token(data={
        "sub": user.email, 
        "role": str(user.role),
        "id": str(user.id)
    })
    
    await user_service.update_last_login(user.id)

    return {
        "user": user.to_dict(),
        "access_token": token,
        "token_type": "bearer"
    }

@router.post("/scan")
async def scan(file: UploadFile = File(...)):

    content = await file.read()
    file_extension = file.filename.split(".")[-1].lower()

    scanner: ScannerInterface = None
    match file_extension:
        case "pdf":
            scanner = PDFScanner()
        case "json":
            scanner = JSONScanner()
        case _:
            raise HTTPException(status_code=415, detail=f"Extensão .{file_extension} não suportada. Envie PDF ou JSON.")
        
    result: PurchaseOrder = scanner.scan(content)

    return result.to_dict()

