from fastapi import APIRouter

# Création d'un router dédié à la santé de l'API
router = APIRouter(
    prefix="/health",  # toutes les routes ici auront le préfixe /health
    tags=["health"],   # utilisé pour organiser la doc Swagger
)

@router.get("/")
async def health_check():
    """
    Endpoint simple pour vérifier que l'API est opérationnelle.
    Exemple: GET /health/
    """
    return {"status": "ok"}

#pour un futur monitoring