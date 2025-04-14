from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Cliente
from schemas import ClienteBase, Cliente as ClienteSchema  # ClienteBase para entrada e ClienteSchema para resposta

router = APIRouter()

# Função para obter a sessão do banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

