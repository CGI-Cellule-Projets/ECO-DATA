from pydantic import BaseModel, Field
from datetime import datetime
from typing import Literal

class SensorMeasurementCreate(BaseModel):
    """
    Modèle Pydantic qui définit à quoi doit ressembler
    une mesure de capteur envoyée au backend.
    """

    sensor_id: int = Field(
        ...,
        example=1,
        description="Identifiant du capteur (clé étrangère vers la table sensors).",
    )
    city_code: str = Field(
        ...,
        min_length=2,
        max_length=10,
        example="MA-MRK",
        description="Code de la ville (ex: MA-MRK pour Marrakech).",
    )
    pollutant: Literal["PM2.5", "PM10", "NO2", "O3"] = Field(
        ...,
        example="PM2.5",
        description="Type de polluant mesuré.",
    )
    value: float = Field(
        ...,
        gt=0,
        example=35.6,
        description="Valeur mesurée pour le polluant.",
    )
    unit: str = Field(
        ...,
        example="µg/m3",
        description="Unité de la mesure.",
    )
    timestamp: datetime = Field(
        ...,
        example="2026-04-18T18:00:00Z",
        description="Date/heure de la mesure (UTC).",
    )