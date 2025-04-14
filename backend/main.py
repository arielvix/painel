from passlib.context import CryptContext
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware  # Importa o CORSMiddleware
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
from database import SessionLocal  # Importe a sessão do banco de dados
from sqlalchemy.exc import SQLAlchemyError  # Para capturar erros de banco de dados
from pydantic import BaseModel
from models import Cliente, Usuarios  # Certifique-se de ter importado o modelo Cliente e Usuarios

# Carregar variáveis de ambiente
load_dotenv()

# Criar a aplicação FastAPI
app = FastAPI()

# Adicionando o middleware CORS para permitir o acesso do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens (em produção, ajuste para permitir apenas o domínio necessário)
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

# Configuração do bcrypt com passlib
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Função para gerar o hash bcrypt da senha
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Função para verificar a senha fornecida com o hash bcrypt armazenado
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Definir o modelo Pydantic para os dados do cliente
class ClienteBase(BaseModel):
    nome: str
    ramal_cadastrado: str
    linha: str
    cnpj_ou_cpf: str

class ClienteSchema(ClienteBase):
    id: int

    class Config:
        orm_mode = True  # Permite a conversão do modelo ORM (SQLAlchemy) para Pydantic

# Função para testar a conexão com o banco de dados
def test_db_connection():
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))  # Use text() para a consulta SQL
        print("Conexão bem-sucedida ao banco de dados!")
        db.close()
    except Exception as e:
        print(f"Erro na conexão com o banco de dados: {e}")

# Função para obter a sessão do banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Rota para listar todos os clientes cadastrados
@app.get("/cadastro_cliente/", response_model=list[ClienteSchema])
def get_clientes(db: Session = Depends(get_db)):
    try:
        result = db.query(Cliente).all()
        if not result:
            return []
        return result
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar clientes: {str(e)}")

# Rota para cadastrar um novo cliente
@app.post("/cadastro_cliente/", response_model=ClienteSchema)
def cadastrar_cliente(cliente: ClienteBase, db: Session = Depends(get_db)):
    try:
        db_cliente = db.query(Cliente).filter(Cliente.ramal_cadastrado == cliente.ramal_cadastrado).first()
        if db_cliente:
            raise HTTPException(status_code=400, detail="Ramal já cadastrado")
        
        novo_cliente = Cliente(
            nome=cliente.nome,
            ramal_cadastrado=cliente.ramal_cadastrado,
            linha=cliente.linha,
            cnpj_ou_cpf=cliente.cnpj_ou_cpf
        )
        
        db.add(novo_cliente)
        db.commit()
        db.refresh(novo_cliente)
        
        return novo_cliente

    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Erro ao cadastrar o cliente: {str(e)}")

# Rota para editar um cliente
@app.put("/cadastro_cliente/{cliente_id}", response_model=ClienteSchema)
def editar_cliente(cliente_id: int, cliente: ClienteBase, db: Session = Depends(get_db)):
    try:
        db_cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
        if not db_cliente:
            raise HTTPException(status_code=404, detail="Cliente não encontrado")

        db_cliente.nome = cliente.nome
        db_cliente.ramal_cadastrado = cliente.ramal_cadastrado
        db_cliente.linha = cliente.linha
        db_cliente.cnpj_ou_cpf = cliente.cnpj_ou_cpf

        db.commit()
        db.refresh(db_cliente)
        return db_cliente

    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Erro ao editar o cliente: {str(e)}")

# Rota para remover um cliente
@app.delete("/cadastro_cliente/{cliente_id}", response_model=ClienteSchema)
def remover_cliente(cliente_id: int, db: Session = Depends(get_db)):
    try:
        cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
        if not cliente:
            raise HTTPException(status_code=404, detail="Cliente não encontrado")

        db.delete(cliente)
        db.commit()
        return cliente

    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Erro ao remover o cliente: {str(e)}")

# Rota de login para autenticar o ramal e a senha
class LoginSchema(BaseModel):
    ramal: str
    senha: str

@app.post("/login")
def login(login: LoginSchema, db: Session = Depends(get_db)):
    try:
        usuario = db.query(Usuarios).filter(Usuarios.ramal == login.ramal).first()

        if not usuario:
            raise HTTPException(status_code=404, detail="Ramal não encontrado")
        
        # Verifica se a senha fornecida corresponde ao hash bcrypt armazenado
        if not verify_password(login.senha, usuario.senha):
            raise HTTPException(status_code=401, detail="Senha incorreta")
        
        return {"message": "Login bem-sucedido", "ramal": usuario.ramal}
    
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Erro ao fazer login: {str(e)}")

# Rota para cadastrar um novo usuário
class UsuarioBase(BaseModel):
    ramal: str
    senha: str

class UsuarioSchema(UsuarioBase):
    id: int

    class Config:
        orm_mode = True

@app.post("/cadastro_usuario/", response_model=UsuarioSchema)
def cadastrar_usuario(usuario: UsuarioBase, db: Session = Depends(get_db)):
    try:
        db_usuario = db.query(Usuarios).filter(Usuarios.ramal == usuario.ramal).first()

        if db_usuario:
            raise HTTPException(status_code=400, detail="Ramal já cadastrado")
        
        senha_hash = hash_password(usuario.senha)

        novo_usuario = Usuarios(
            ramal=usuario.ramal,
            senha=senha_hash
        )
        
        db.add(novo_usuario)
        db.commit()
        db.refresh(novo_usuario)
        
        return novo_usuario

    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Erro ao cadastrar o usuário: {str(e)}")

# Teste de conexão com o banco de dados ao iniciar
test_db_connection()
