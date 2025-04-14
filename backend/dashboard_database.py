from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Carregar variáveis do arquivo .env
load_dotenv()

# Configuração da conexão com a base da dashboard
DASHBOARD_DB_HOST = os.getenv("DASHBOARD_DB_HOST")
DASHBOARD_DB_PORT = os.getenv("DASHBOARD_DB_PORT")
DASHBOARD_DB_USER = os.getenv("DASHBOARD_DB_USER")
DASHBOARD_DB_PASSWORD = os.getenv("DASHBOARD_DB_PASSWORD")
DASHBOARD_DB_NAME = os.getenv("DASHBOARD_DB_NAME")

# URL de conexão para a base da dashboard
DASHBOARD_DATABASE_URL = f"mysql+pymysql://{DASHBOARD_DB_USER}:{DASHBOARD_DB_PASSWORD}@{DASHBOARD_DB_HOST}:{DASHBOARD_DB_PORT}/{DASHBOARD_DB_NAME}"

# Criação do engine e da sessão para a base da dashboard
dashboard_engine = create_engine(DASHBOARD_DATABASE_URL, pool_recycle=3600)
DashboardSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=dashboard_engine)

DashboardBase = declarative_base()
