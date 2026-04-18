from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError

from app.config import JWT_SECRET_KEY, JWT_ALGORITHM

# Schéma de sécurité "Bearer token"
security = HTTPBearer()

def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    """
    Dépendance FastAPI pour sécuriser les routes admin avec un JWT.

    Usage plus tard:
    @router.get("/admin-only")
    async def admin_only_route(current_admin = Depends(get_current_admin)):
        ...
    """
    token = credentials.credentials
    try:
        # On décode le token
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        role = payload.get("role")

        # On vérifie que le rôle est bien "admin"
        if role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not enough permissions",
            )
        return payload  # on pourrait retourner l'utilisateur admin ici
    except JWTError:
        # Si le token est invalide ou expiré
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )