import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Button, Snackbar, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Send as SendIcon, Error as ErrorIcon, CheckCircle as CheckCircleIcon, Add as AddIcon, AccessTime as AccessTimeIcon } from '@mui/icons-material';

export default function Suporte() {
  const [tickets, setTickets] = useState([
    { id: 1, title: 'Problema com a rede', status: 'Em andamento', atendente: 'João', time: '2025-04-12 14:30', prioridade: 'Alta', ramal: 'ext.519', produto: 'Roteador' },
    { id: 2, title: 'Erro ao acessar o sistema', status: 'Resolvido', atendente: 'Maria', time: '2025-04-11 10:00', prioridade: 'Média', ramal: 'ext.520', produto: 'Sistema' },
    { id: 3, title: 'Falha no servidor', status: 'Aguardando Atendimento', atendente: 'Carlos', time: '2025-04-12 16:00', prioridade: 'Baixa', ramal: 'ext.521', produto: 'Servidor' },
  ]);
  
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [ticketDetails, setTicketDetails] = useState({
    titulo: '',
    produto: '',
    descricao: '',
    prioridade: '',
    atendente: 'Aguardando',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleNewTicketToggle = () => {
    setIsNewTicketOpen(!isNewTicketOpen);
  };

  const handleSubmitNewTicket = (e) => {
    e.preventDefault();
    const newTicket = { 
      id: tickets.length + 1, 
      title: ticketDetails.titulo, 
      status: 'Aguardando Atendimento', 
      atendente: ticketDetails.atendente, 
      time: new Date().toISOString(),
      prioridade: ticketDetails.prioridade,
      ramal: ticketDetails.ramal,
      produto: ticketDetails.produto,
    };
    setTickets([...tickets, newTicket]);
    setSuccessMessage('Ticket criado com sucesso!');
    setIsNewTicketOpen(false); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails({
      ...ticketDetails,
      [name]: value,
    });
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
  };

  return (
    <Container maxWidth="xl" sx={{ padding: 4, position: 'relative' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#f97400', backgroundColor: '#fff', display: 'inline-block', padding: '4px 8px', borderRadius: '8px', marginTop: '20px' }}>
        Suporte
      </Typography>

      {/* Tabela de Tickets de Suporte */}
      <Grid container spacing={3} sx={{ marginTop: '5%' }}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 3, borderRadius: '16px' }}>
            <Typography variant="h6" sx={{ color: '#f97400', backgroundColor: '#fff', display: 'inline-block', padding: '4px 8px', borderRadius: '8px' }}>
              Tickets de Suporte
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table sx={{ minWidth: 650 }} aria-label="tickets de suporte">
                <TableHead>
                  <TableRow>
                    <TableCell>Ticket ID</TableCell>
                    <TableCell>Título</TableCell>
                    <TableCell>Atendente</TableCell>
                    <TableCell>Data de Abertura</TableCell>
                    <TableCell>Prioridade</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>{ticket.atendente}</TableCell>
                      <TableCell>{new Date(ticket.time).toLocaleString()}</TableCell>
                      <TableCell>{ticket.prioridade}</TableCell>
                      <TableCell>
                        {ticket.status} 
                        {ticket.status === 'Em andamento' && <ErrorIcon sx={{ color: '#f97400', marginLeft: 1 }} />}
{ticket.status === 'Concluído' && <CheckCircleIcon sx={{ color: '#4CAF50', marginLeft: 1 }} />}
{ticket.status === 'Aguardando Atendimento' && <AccessTimeIcon sx={{ color: '#ffa500', marginLeft: 1 }} />}
{ticket.status === 'Resolvido' && <CheckCircleIcon sx={{ color: '#4CAF50', marginLeft: 1 }} />} {/* Exibe o ícone quando o status for 'Resolvido' */}

                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Ícone para Criar Novo Ticket */}
      <IconButton
  onClick={handleNewTicketToggle}
  sx={{
    position: 'absolute',      // Posição absoluta para posicionamento livre
    bottom: 40,                // Distância de 20px do fundo
    left: 0,                 // Distância de 20px da direita
    backgroundColor: '#f97400', // Cor de fundo laranja
    color: '#fff',             // Cor do ícone branco
    borderRadius: '50%',       // Formato arredondado
    padding: 2,                // Ajusta o padding interno do ícone
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Sombra suave
    '&:hover': {
      backgroundColor: '#e56b00', // Cor de fundo ao passar o mouse
    },
  }}
>
  <AddIcon sx={{ fontSize: '10px' }} />
</IconButton>

      
      {/* Formulário para Criar Novo Ticket */}
  {isNewTicketOpen && (
    <Box
      sx={{
        position: 'absolute',
        bottom: '70px', // Ajusta a posição para abrir diretamente sobre o botão "+"
        left: '43%',
        transform: 'translateX(-50%)',
        width: '60%',  // Aumenta a largura do formulário para se expandir horizontalmente
        padding: 1,
        borderRadius: '16px',
        backgroundColor: 'rgba(255, 255, 255, 1)', // Cor cinza claro com transparência mediana
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
        animation: 'slideUp 0.5s ease-out', // Efeito de animação
        display: 'flex',
        flexDirection: 'row', // Coloca os campos horizontalmente
        flexWrap: 'wrap', // Permite que os campos "quebrem" para a linha seguinte se necessário
        justifyContent: 'space-between', // Distribui os campos de forma igual
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2, textAlign: 'center', width: '100%' }}>Abrir Novo Ticket</Typography>
      <form onSubmit={handleSubmitNewTicket} style={{ width: '100%' }}>
        {/* Título do Ticket */}
        <TextField
          label="Título do Ticket"
          fullWidth
          name="titulo"
          value={ticketDetails.titulo}
          onChange={handleChange}
          sx={{ marginBottom: 2, width: '30%' }} // Ajuste para largura horizontal
        />
        
        {/* Produto (Lista Suspensa) */}
        <FormControl fullWidth sx={{ marginBottom: 2, width: '30%' }}>
          <InputLabel>Produto</InputLabel>
          <Select
            value={ticketDetails.produto}
            onChange={handleChange}
            name="produto"
          >
            <MenuItem value="Chat">Chat</MenuItem>
            <MenuItem value="PBX">PBX</MenuItem>
            <MenuItem value="Suporte Técnico">Suporte Técnico</MenuItem>
            <MenuItem value="Cloud">Cloud</MenuItem>
          </Select>
        </FormControl>
        
        {/* Prioridade (Lista Suspensa) */}
        <FormControl fullWidth sx={{ marginBottom: 2, width: '30%' }}>
          <InputLabel>Prioridade</InputLabel>
          <Select
            value={ticketDetails.prioridade}
            onChange={handleChange}
            name="prioridade"
          >
            <MenuItem value="Alta">Alta</MenuItem>
            <MenuItem value="Média">Média</MenuItem>
            <MenuItem value="Baixa">Baixa</MenuItem>
          </Select>
        </FormControl>
  
        {/* Descrição (Campo de Texto) */}
        <TextField
          label="Descrição"
          fullWidth
          multiline
          rows={4}
          name="descricao"
          value={ticketDetails.descricao}
          onChange={handleChange}
          sx={{ marginBottom: 2, width: '100%' }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" color="primary" startIcon={<SendIcon sx={{ fontSize: '10px' }} />} sx={{ textTransform: 'none', borderRadius: '16px', padding: '10px 20px', backgroundColor: '#2b2c40', color: '#fff' }}>
          </Button>
        </Box>
      </form>
    </Box>
  )}
  

      {/* Snackbar de Confirmação */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={successMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ backgroundColor: '#4CAF50' }}
      />
    </Container>
  );
}
