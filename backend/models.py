from sqlalchemy import Column, Integer, String
from database import Base

# Modelo de Cliente
class Cliente(Base):
    __tablename__ = "clientes"  # Nome da tabela no banco de dados
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    ramal_cadastrado = Column(String)
    linha = Column(String)
    cnpj_ou_cpf = Column(String)

# Modelo de Usuarios
class Usuarios(Base):
    __tablename__ = "usuarios"  # Nome da tabela no banco de dados
    
    id = Column(Integer, primary_key=True, index=True)
    ramal = Column(String, unique=True, index=True)  # Campo ramal
    senha = Column(String)  # Campo senha
