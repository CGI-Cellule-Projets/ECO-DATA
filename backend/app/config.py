import os
from dotenv import load_dotenv

# Charge les variables depuis un fichier .env (optionnel)
load_dotenv()

# Clé secrète pour signer les JWT (à mettre dans un vrai .env en prod)
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-secret-change-me")
JWT_ALGORITHM = "HS256"