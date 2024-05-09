import os
from dotenv import load_dotenv

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from databases import DatabaseURL
from starlette.config import Config
from starlette.datastructures import Secret

from api.routers import course, member, log


load_dotenv(".env")

app = FastAPI(title="Sysken Attendance", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("ALLOWED_HOSTS"),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(course.router)
app.include_router(member.router)
app.include_router(log.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)