import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, IconButton, AppBar, Container, Tooltip, Drawer, List, ListItem, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';  // Ícone simples e minimalista
import SupportIcon from '@mui/icons-material/Help';  // Ícone minimalista
import LogoutIcon from '@mui/icons-material/ExitToApp';  // Ícone minimalista
import SettingsIcon from '@mui/icons-material/Settings';  // Ícone minimalista
import ReceiptIcon from '@mui/icons-material/Receipt';  // Ícone minimalista
import CallIcon from '@mui/icons-material/Phone';  // Ícone minimalista
import ChatIcon from '@mui/icons-material/Chat';  // Ícone minimalista

import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import VirtualAssistant from './VirtualAssistant'; // Importando o assistente virtual
import Profile from './Profile';  // Importe do componente Profile
const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
  {/* Sidebar (Drawer) */}
  <Drawer
        sx={{
          width: 58,  // Reduzir a largura da sidebar
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 58,  // Ajusta a largura para a sidebar
            backgroundColor: '#f4f4f4',  // Fundo claro da sidebar
            color: '#000',  // Cor dos ícones e texto
            boxSizing: 'border-box',
            paddingTop: '60px',  // Ajusta o espaço para o AppBar
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',  // Sombra suave
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '150px' }}>
        <Tooltip title="Ir para Dashboard">
              <IconButton 
                sx={{
                  color: '#fff',
                  fontSize: '10px',  // Reduzido o tamanho dos ícones
                  padding: '6px',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.2)' }
                }}
                onClick={() => handleNavigation('/dashboard')}
              >
                <DashboardIcon sx={{
    color: 'rgba(51, 196, 28, 0.8)', // Cor com alpha (transparência) usando RGBA
    fontSize: '35px',
    padding: '6px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': { 
      transform: 'scale(1.2)', 
      color: 'rgb(13, 13, 13)' // Cor mais intensa no hover
    }
  }}/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Ir para Chat">
              <IconButton 
                sx={{
                  color: '#fff',
                  fontSize: '16px',
                  padding: '6px',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.2)' }
                }}
                onClick={() => handleNavigation('/chat')}
              >
                <ChatIcon sx={{
    color: 'rgba(29, 233, 230, 0.8)', // Cor com alpha (transparência) usando RGBA
    fontSize: '35px',
    padding: '6px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': { 
      transform: 'scale(1.2)', 
      color: 'rgb(13, 13, 13)' // Cor mais intensa no hover
    }
  }}/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Ir para Callcenter">
              <IconButton 
                sx={{
                  color: '#fff',
                  fontSize: '16px',
                  padding: '6px',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.2)' }
                }}
                onClick={() => handleNavigation('/callcenter')}
              >
                <CallIcon sx={{
    color: 'rgba(225, 106, 8, 0.8)', // Cor com alpha (transparência) usando RGBA
    fontSize: '35px',
    padding: '6px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': { 
      transform: 'scale(1.2)', 
      color: 'rgb(13, 13, 13)' // Cor mais intensa no hover
    }
  }}/>
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', position:'absolute', alignItems:  'center', paddingTop: '0px' }}>        
            
                                  </Box>
      </Drawer>


      {/* AppBar com estilo mais clean e profissional */}
      <AppBar 
  position="fixed" 
  sx={{
    zIndex: 1200, 
    backgroundColor: 'transparent', // Deixando a AppBar transparente
    height: '60px',  // Mantém a altura ajustada
    boxShadow: 'none', // Remover a sombra para um visual mais limpo (ou ajustar se preferir)
  }}
  >
        <Toolbar sx={{ justifyContent: 'space-between', height: '80%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => navigate('/home')}>
              <img
                src={darkMode ? '/logo.png' : '/logodark.png'}
                alt="Logo"
                style={{
                  height: '26px', // Logo principal com tamanho reduzido
                  width: 'auto',
                  marginLeft: '-30px', // Desloca o logo para a direita (ajuste conforme necessário)
                  marginTop: '-20px',  // Desloca o logo para baixo
                }}
              />
            </IconButton>
          </Box>
          {/* Grupo de ícones separados */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 2 }}>
          <Tooltip title="Mudar para modo escuro/claro">
          <IconButton 
                sx={{
                  color: '#fff',
                  fontSize: '15px',
                  padding: '6px',
                  transition: 'transform 0.3s ease-in-out',  // Efeito de flutuação nos ícones
                  '&:hover': { transform: 'scale(1.2)' }  // Efeito de flutuação no hover
                }}
                onClick={toggleDarkMode}
              >
                {darkMode ? '🌜' : '🌞'}
              </IconButton>
              </Tooltip>
            <Tooltip title="Ir para Faturas">
              <IconButton 
                sx={{
                  color: '#fff',
                  fontSize: '16px',
                  padding: '6px',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.2)' }
                }}
                onClick={() => handleNavigation('/faturas')}
              >
                <ReceiptIcon sx={{
    color: 'rgba(255, 242, 0, 0.8)', // Cor com alpha (transparência) usando RGBA
    fontSize: '35px',
    padding: '6px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': { 
      transform: 'scale(1.2)', 
      color: 'rgb(52, 253, 2)' // Cor mais intensa no hover
    }
  }}/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Ir para Suporte">
              <IconButton 
                sx={{
                  color: '#fff',
                  fontSize: '16px',
                  padding: '6px',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.2)' }
                }}
                onClick={() => handleNavigation('/suporte')}
              >
                <SupportIcon sx={{
    color: 'rgb(255, 255, 0)', // Cor com alpha (transparência) usando RGBA
    fontSize: '35px',
    padding: '6px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': { 
      transform: 'scale(1.2)', 
      color: 'rgb(7, 177, 250)' // Cor mais intensa no hover
    }
  }}/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Perfil" >
            <IconButton>
              <Profile />
            </IconButton>
            </Tooltip>
            <Tooltip title="Ir para Configurações">
              <IconButton 
                sx={{
                  color: '#fff',
                  fontSize: '16px',
                  padding: '6px',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.2)' }
                }}
                onClick={() => handleNavigation('/configuration')}
              >
                <SettingsIcon sx={{
    color: 'rgba(19, 18, 18, 0.8)', // Cor com alpha (transparência) usando RGBA
    fontSize: '35px',
    padding: '6px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': { 
      transform: 'scale(1.2)', 
      color: 'rgb(234, 10, 156)' // Cor mais intensa no hover
    }
  }}/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Sair">
              <IconButton 
                sx={{
                  color: '#fff',
                  fontSize: '16px',
                  padding: '6px',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.2)' }
                }}
                onClick={() => {
                  localStorage.removeItem('authToken');
                  localStorage.removeItem('ramal');
                  navigate('/login');
                }}
              >
                <LogoutIcon sx={{
    color: 'rgba(198, 15, 15, 0.8)', // Cor com alpha (transparência) usando RGBA
    fontSize: '30px',
    padding: '6px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': { 
      transform: 'scale(1.2)', 
      color: 'rgb(249, 13, 13)' // Cor mais intensa no hover
    }
  }}/>
              </IconButton>
            </Tooltip>
          </Box>
          
        </Toolbar>
      </AppBar>

      {/* Conteúdo da página */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: darkMode ? '#FFFFFF' : '#333',  // Fundo mais sóbrio
          minHeight: '100vh',
          pt: 8, 
          px: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: 4,
            boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
            width: '100%',
            minHeight: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Outlet />
        </Container>
      </Box>
      <VirtualAssistant />
    </Box>
  );
};

export default Layout;
