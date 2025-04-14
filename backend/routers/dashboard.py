from fastapi import APIRouter, Query
from sqlalchemy import text
from dashboard_database import DashboardSessionLocal
from datetime import timedelta

router = APIRouter()

def format_timedelta(seconds):
    """Converte o tempo em segundos para o formato hh:mm:ss sem milissegundos"""
    td = timedelta(seconds=seconds)
    return str(td).split('.')[0]  # Remove os milissegundos (parte após o ponto)

def format_time_end(timestamp):
    """Converte o timestamp para o formato de data e hora"""
    return timestamp.strftime("%Y-%m-%d %H:%M:%S")

@router.get("/dashboard")
def get_dashboard(from_ramal: str = Query(default=None), to_ramal: str = Query(default=None)):
    session = DashboardSessionLocal()
    try:
        base_query = "SELECT * FROM cdr_logs"
        filters = []

        # Adiciona o filtro do ramal inicial, caso fornecido
        if from_ramal:
            from_ramal_number = int(from_ramal.replace('ext.', ''))
            filters.append(f"CAST(SUBSTRING_INDEX(from_no, '.', -1) AS UNSIGNED) >= {from_ramal_number}")

        # Adiciona o filtro do ramal final, caso fornecido
        if to_ramal:
            to_ramal_number = int(to_ramal.replace('ext.', ''))
            filters.append(f"CAST(SUBSTRING_INDEX(from_no, '.', -1) AS UNSIGNED) <= {to_ramal_number}")

        # Se houver filtros, adiciona ao comando SQL
        if filters:
            base_query += " WHERE " + " AND ".join(filters)

        result = session.execute(text(base_query)).fetchall()

        # Filtrar e formatar os dados
        formatted_result = []
        total_duration_seconds = 0
        valid_ligacoes = 0

        for row in result:
            # Extraindo o número do ramal com 3 dígitos
            ramal = row.from_no.split('.')[-1]
            duration_seconds = row.duration.total_seconds()

            # Ignorar resultados com duração igual a zero
            if duration_seconds == 0:
                continue  # Ignora este resultado

            # Adiciona à lista se a duração for diferente de zero
            if len(ramal) == 3 and ramal.isdigit():  # Verificando se tem exatamente 3 dígitos
                formatted_result.append({
                    "from_no": ramal,
                    "to_no": row.to_no,  # Retorna todos os números de 'to_no'
                    "duration": format_timedelta(duration_seconds),  # Formata o tempo de duração sem milissegundos
                    "time_end": format_time_end(row.time_end)  # Formata a data e hora de 'time_end'
                })
                
                # Somando a duração total e contando as ligações válidas
                total_duration_seconds += duration_seconds
                valid_ligacoes += 1

        # Calcular o tempo médio de ligação (duração média)
        tempo_medio = format_timedelta(total_duration_seconds / valid_ligacoes) if valid_ligacoes > 0 else "00:00:00"

        # Calcular a quantidade de ramais únicos online (quem fez chamadas)
        ramais_online = len(set(row.from_no for row in result))

        # Retornar os dados estruturados
        return {
            "ramais_online": ramais_online,
            "total_ligacoes": valid_ligacoes,
            "tempo_medio": tempo_medio,
            "ramais": formatted_result  # Retorna os detalhes de cada chamada com os dados formatados
        }
    finally:
        session.close()
