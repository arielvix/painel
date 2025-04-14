import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Box, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../../styles/styles.css'; // Ajuste o caminho conforme necessário


export default function Configuration() {
  const [empresa, setEmpresa] = useState('');
  const [ramal, setRamal] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [linha, setLinha] = useState('');
  const [clientes, setClientes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);  // Para controlar qual cliente está sendo editado

  // Função para obter todos os clientes cadastrados
  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:8000/cadastro_cliente/');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  // Função para salvar ou editar a empresa no backend
  const salvarEmpresa = async () => {
    if (!empresa || !cnpj || !linha || !ramal) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const dadosEmpresa = {
      nome: empresa,
      ramal_cadastrado: ramal,
      linha: linha,
      cnpj_ou_cpf: cnpj,
    };

    try {
      if (editIndex !== null) {
        // Enviar uma requisição PUT para editar o cliente
        const clienteId = clientes[editIndex].id;
        const response = await fetch(`http://localhost:8000/cadastro_cliente/${clienteId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosEmpresa),
        });

        if (response.ok) {
          alert('Cliente editado com sucesso!');
          fetchClientes();  // Recarrega a lista de clientes
        } else {
          alert('Erro ao editar cliente');
        }
      } else {
        // Enviar uma requisição POST para adicionar o cliente
        const response = await fetch('http://localhost:8000/cadastro_cliente/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosEmpresa),
        });

        if (response.ok) {
          alert('Cliente cadastrado com sucesso!');
          fetchClientes();  // Recarrega a lista de clientes
        } else {
          alert('Erro ao cadastrar cliente');
        }
      }
    } catch (error) {
      alert('Erro de conexão com o servidor');
    }

    setEmpresa('');
    setRamal('');
    setCnpj('');
    setLinha('');
    setEditIndex(null);  // Limpar o índice de edição após salvar
    setShowForm(false);
  };

  // Função para remover um cliente
  const removerCliente = async (index) => {
    const cliente = clientes[index];

    const confirmacao = window.confirm(`Tem certeza que deseja remover a empresa ${cliente.nome}?`);

    if (confirmacao) {
      try {
        const response = await fetch(`http://localhost:8000/cadastro_cliente/${cliente.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Cliente removido com sucesso!');
          const updatedClientes = clientes.filter((_, i) => i !== index);
          setClientes(updatedClientes);  // Remove o cliente da lista no frontend
        } else {
          alert('Erro ao remover cliente');
        }
      } catch (error) {
        alert('Erro de conexão com o servidor');
      }
    }
  };

  // Função para editar um cliente
  const editarCliente = (index) => {
    const cliente = clientes[index];
    setEmpresa(cliente.nome);
    setRamal(cliente.ramal_cadastrado);
    setCnpj(cliente.cnpj_ou_cpf);
    setLinha(cliente.linha);
    setEditIndex(index); // Define o índice do cliente que está sendo editado
    setShowForm(true); // Exibe o formulário de edição
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#f97400', backgroundColor: '#fff', display: 'inline-block', padding: '4px 8px', borderRadius: '8px' }}>
        Cadastro Clientes
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="tabela de clientes">
          <TableHead>
            <TableRow>
              <TableCell>Razão Social</TableCell>
              <TableCell>CNPJ/CPF</TableCell>
              <TableCell>Ramal</TableCell>
              <TableCell>Linha</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {clientes.map((cliente, index) => (
    <TableRow key={index}>
            <TableCell>{cliente.nome}</TableCell>
      <TableCell>{cliente.cnpj_ou_cpf}</TableCell>
      <TableCell>{cliente.ramal_cadastrado}</TableCell>
      <TableCell>{cliente.linha}</TableCell>
            <TableCell>
        <IconButton onClick={() => editarCliente(index)} color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => removerCliente(index)} color="error">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}

  {/* Adicionar ou editar cliente */}
  {showForm && (
    <TableRow
      sx={{
        animation: 'slideUp 0.5s ease-out', // Animação de deslizar
        display: 'table-row', // Garante que a linha será exibida corretamente
      }}
    >
      <TableCell component={Paper}
  sx={{
    minWidth: '-500px',  // Largura mínima da tabela
    width: '10%',      // Tabela ocupa 100% do espaço disponível
    maxHeight: '0px', // Ajusta a altura máxima da tabela
    overflowY: 'auto',  // Adiciona rolagem vertical se necessário
    borderRadius: '16px',  // Borda arredondada
    boxShadow: '0 6px 12px rgba(0,0,0,0.2)',  // Sombra suave
  }}
>
        <TextField
          label="Nome da Empresa"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': { borderRadius: '20px' },
            width: '150%',
          }}
        />
      </TableCell>
      
      <TableCell sx={{ padding: '8px', width: '30%' }}>
        <TextField
          label="CNPJ/CPF"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': { borderRadius: '20px' },
            width: '100%',
          }}
        />
      </TableCell>
      <TableCell sx={{ padding: '20px', width: '20%' }}>
        <TextField
          label="Ramal"
          value={ramal}
          onChange={(e) => setRamal(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': { borderRadius: '8px' },
            width: '100%',
          }}
        />
      </TableCell>
      <TableCell sx={{ padding: '20px', width: '100%' }}>
        <TextField
          label="Linha"
          value={linha}
          onChange={(e) => setLinha(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': { borderRadius: '8px' },
            width: '100%',
          }}
        />
      </TableCell>
      <TableCell sx={{ padding: '8px', width: '0%' }}>
        <Button
          onClick={salvarEmpresa}
          variant="contained"
          color="success"
          sx={{
            backgroundColor: '#4CAF50',
            '&:hover': { backgroundColor: '#388E3C' },
            borderRadius: '16px',
            padding: '5px 15px', // Ajustando o botão para ser pequeno e compacto
            minWidth: 'auto',
            height: 'auto',
          }}
        >
          <CheckCircleIcon sx={{ color: '#fff', fontSize: '18px' }} />
        </Button>
      </TableCell>
    </TableRow>
  )}
</TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" justifyContent="flex-start" alignItems="center" mt={3}>
        <IconButton onClick={() => setShowForm(!showForm)} sx={{ backgroundColor: '#2b2c40', color: '#fff', borderRadius: '50%' }}>
          <AddIcon />
        </IconButton>
      </Stack>
    </Container>
    
  );
  
}

