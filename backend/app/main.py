from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routers import upload, wells, analysis
from dotenv import load_dotenv
from .routers import upload, wells, analysis, chat



# Load environment variables
load_dotenv()

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Well Log AI System")

# CORS (Development Mode)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(upload.router)
app.include_router(wells.router)
app.include_router(analysis.router)
app.include_router(chat.router)


@app.get("/")
def root():
    return {"message": "Well Log API running with AI interpretation"}
