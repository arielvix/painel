import React from 'react';
import { Box, Typography, Container, Paper, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupportIcon from '@mui/icons-material/Support';
import ChatIcon from '@mui/icons-material/Chat';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CallIcon from '@mui/icons-material/Call';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ marginTop: 1, paddingX: 1 }}>
      {/* Título principal (menor) */}
      <Typography
        variant="h5" // Menor que h4
        gutterBottom
        sx={{
          textAlign: 'center',
          color: '#f97400',
          backgroundColor: '#fff',
          display: 'inline-block',
          padding: '2px 8px',
          borderRadius: '6px',
          fontWeight: 'bold',
        }}
      >
        Painel Gestão
      </Typography>

      <Paper
        sx={{
          marginTop: 1,
          padding: 2, // Menor padding
          borderRadius: '12px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '30vh', // reduzido
            justifyContent: 'center',
          }}
        >
          {/* Saudação ao usuário (menor texto) */}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 500,
              color: '#333',
              marginBottom: 1,
            }}
          >
            Olá, Ariel!
          </Typography>

          {/* Texto descritivo (menor) */}
          <Typography
            variant="body2"
            sx={{ color: '#666', textAlign: 'center', maxWidth: 500, marginBottom: 2 }}
          >
            Painel inicial do CNX Painel Gestão. Acesse métricas, suporte, chat,
            faturas e muito mais. Tudo em um só lugar.
          </Typography>

          {/* Painel Rápido (5 cards) com grid mais compacto */}
          <Grid container spacing={1} justifyContent="center">
            {/* Card Dashboard */}
            <Grid item xs={12} sm={6} md={2}>
              <Paper
                sx={{
                  textAlign: 'center',
                  padding: 1.5,
                  borderRadius: 2,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <DashboardIcon sx={{ fontSize: 32, color: '#f97400' }} />
                <Typography variant="subtitle2" sx={{ mt: 0.5, fontWeight: 'bold' }}>
                  Dashboard
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Métricas e relatórios.
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate('/dashboard')}
                  sx={{
                    backgroundColor: '#f97400',
                    color: '#fff',
                    borderRadius: '12px',
                    paddingX: 1,
                    paddingY: 0.3,
                    mt: 0.5,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#ff7f32',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  Acessar
                </Button>
              </Paper>
            </Grid>

            {/* Card Suporte */}
            <Grid item xs={12} sm={6} md={2}>
              <Paper
                sx={{
                  textAlign: 'center',
                  padding: 1.5,
                  borderRadius: 2,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <SupportIcon sx={{ fontSize: 32, color: '#f97400' }} />
                <Typography variant="subtitle2" sx={{ mt: 0.5, fontWeight: 'bold' }}>
                  Suporte
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Acompanhe chamados.
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate('/suporte')}
                  sx={{
                    backgroundColor: '#f97400',
                    color: '#fff',
                    borderRadius: '12px',
                    paddingX: 1,
                    paddingY: 0.3,
                    mt: 0.5,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#ff7f32',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  Acessar
                </Button>
              </Paper>
            </Grid>

            {/* Card Chat */}
            <Grid item xs={12} sm={6} md={2}>
              <Paper
                sx={{
                  textAlign: 'center',
                  padding: 1.5,
                  borderRadius: 2,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <ChatIcon sx={{ fontSize: 32, color: '#f97400' }} />
                <Typography variant="subtitle2" sx={{ mt: 0.5, fontWeight: 'bold' }}>
                  Chat
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Converse em tempo real.
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate('/chat')}
                  sx={{
                    backgroundColor: '#f97400',
                    color: '#fff',
                    borderRadius: '12px',
                    paddingX: 1,
                    paddingY: 0.3,
                    mt: 0.5,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#ff7f32',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  Acessar
                </Button>
              </Paper>
            </Grid>

            {/* Card Faturas */}
            <Grid item xs={12} sm={6} md={2}>
              <Paper
                sx={{
                  textAlign: 'center',
                  padding: 1.5,
                  borderRadius: 2,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <ReceiptIcon sx={{ fontSize: 32, color: '#f97400' }} />
                <Typography variant="subtitle2" sx={{ mt: 0.5, fontWeight: 'bold' }}>
                  Faturas
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Visualize cobranças.
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate('/faturas')}
                  sx={{
                    backgroundColor: '#f97400',
                    color: '#fff',
                    borderRadius: '12px',
                    paddingX: 1,
                    paddingY: 0.3,
                    mt: 0.5,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#ff7f32',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  Acessar
                </Button>
              </Paper>
            </Grid>

            {/* Card Call Center */}
            <Grid item xs={12} sm={6} md={2}>
              <Paper
                sx={{
                  textAlign: 'center',
                  padding: 1.5,
                  borderRadius: 2,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <CallIcon sx={{ fontSize: 32, color: '#f97400' }} />
                <Typography variant="subtitle2" sx={{ mt: 0.5, fontWeight: 'bold' }}>
                  Call Center
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Filas de chamadas.
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate('/callcenter')}
                  sx={{
                    backgroundColor: '#f97400',
                    color: '#fff',
                    borderRadius: '12px',
                    paddingX: 1,
                    paddingY: 0.3,
                    mt: 0.5,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#ff7f32',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  Acessar
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
