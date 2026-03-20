from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

def create_app() -> FastAPI:
    
    app = FastAPI(title="MyApp API")
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], 
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/api/hello")
    def hello():
        return {"message": "Hello from FastAPI"}

    return app


app = create_app()
