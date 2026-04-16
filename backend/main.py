from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI()

# CORS (OBLIGATOIRE)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

stats = {
    "total_requests": 0,
    "errors": 0,
    "status": "OK"
}

logs = []

@app.middleware("http")
async def count_requests(request: Request, call_next):
    stats["total_requests"] += 1

    logs.append({
        "endpoint": request.url.path,
        "method": request.method,
        "time": str(datetime.now())
    })

    response = await call_next(request)
    return response

@app.get("/admin/stats")
def get_stats():
    return stats

@app.get("/admin/logs")
def get_logs():
    return logs
