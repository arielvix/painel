from pydantic import BaseModel

# ClienteBase - utilizado para cadastro (sem o id)
class ClienteBase(BaseModel):
    nome: str
    ramal_cadastrado: str
    linha: str
    cnpj_ou_cpf: str

# Cliente - utilizado para resposta (com o id)
class Cliente(ClienteBase):
    id: int  # O id será retornado após o cadastro

    class Config:
        orm_mode = True
