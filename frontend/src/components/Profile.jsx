import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Ícone de perfil

const Layout = () => {
  const [anchorEl, setAnchorEl] = useState(null); // Estado para controlar o menu
  const open = Boolean(anchorEl); // Verifica se o menu deve ser aberto

  // Função para abrir o menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Função para fechar o menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Ícone de perfil com a lista suspensa */}
      <Tooltip title="Perfil">
        <IconButton onClick={handleClick}>
          <AccountCircleIcon sx={{
                  fontSize: '30px', // Tamanho do ícone
                  fill: 'rgba(233, 250, 1, 0.8)', // Cor com alpha (transparência) usando RGBA
                  transition: 'color 0.3s ease', // Garantindo a transição suave na cor
                  '&:hover': { 
                    fill: 'rgb(255, 234, 5)', // Cor mais intensa no hover
                    transform: 'scale(1.2)' // Aumenta o tamanho do ícone ao passar o mouse
                  }
            }} />
        </IconButton>
      </Tooltip>

      {/* Menu suspenso */}
      <Menu
        anchorEl={anchorEl} // O menu é ancorado ao ícone
        open={open} // Controla se o menu está aberto
        onClose={handleClose} // Fecha o menu
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {/* Opções dentro do menu */}
        <MenuItem onClick={handleClose}>Minha Conta</MenuItem>
        <MenuItem onClick={handleClose}>Configurações</MenuItem>
        <MenuItem onClick={handleClose}>Sair</MenuItem>
      </Menu>
    </Box>
  );
};

export default Layout;
