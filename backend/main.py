from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# On importe les routers définis dans app/api
from app.api import health, sensors


# Création de l'application FastAPI
app = FastAPI(
    title="ECO-DATA API",
    description="Backend FastAPI pour la plateforme ECO-DATA.",
    version="0.1.0",
)


# CORS : pour autoriser le frontend ECO-DATA

# À adapter selon comment on lance le frontend (Live Server, Vite, etc)
origins = [
    "http://localhost:5500",      # cas courant: Live Server VS Code
    "http://127.0.0.1:5500",
    "http://localhost:3000",      # si on utilise un autre dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # domaines autorisés
    allow_credentials=True,
    allow_methods=["*"],          # toutes les méthodes (GET, POST, etc)
    allow_headers=["*"],          # tous les headers
)

# Inclusion des routers

app.include_router(health.router)
app.include_router(sensors.router)


# Route racine de test
@app.get("/")
async def root():
    """
    Endpoint de base pour vérifier que l'API tourne.
    """
    return {"message": "ECO-DATA FastAPI backend is running"}  #msg test