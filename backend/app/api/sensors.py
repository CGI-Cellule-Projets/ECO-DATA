from fastapi import APIRouter
from app.models.sensor import SensorMeasurementCreate

# Router dédié aux capteurs et mesures
router = APIRouter(
    prefix="/sensors",
    tags=["sensors"],
)

@router.post("/measurements")
async def ingest_measurement(payload: SensorMeasurementCreate):
    """
    Endpoint de test qui reçoit une mesure de capteur.

    Pour ma tache, on ne sauvegarde rien encore.
    On se contente de renvoyer ce qu'on a reçu,
    pour prouver que le modèle Pydantic fonctionne.
    """
    # Ici, plus tard, on va appeler un service qui écrit dans MySQL.
    return {"received": payload}