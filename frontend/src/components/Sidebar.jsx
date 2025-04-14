import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupportIcon from '@mui/icons-material/Support';
import PhoneIcon from '@mui/icons-material/Phone';
import LogoutIcon from '@mui/icons-material/Logout';
import NightlightIcon from '@mui/icons-material/NightlightRound';  // Ícone para o dark mode

const Sidebar = ({ collapsed, setCollapsed, darkMode, toggleDarkMode }) => {
  return (
    <Box 
      sx={{
        width: collapsed ? 72 : 220, 
        backgroundColor: darkMode ? '#2b2c40' : '#ffffff', 
        height: '100vh', 
        position: 'fixed', 
        transition: 'width 0.3s',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <List>
        {/* Painel */}
        <ListItem button>
          <ListItemIcon sx={{ color: '#fff' }}>
            <DashboardIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText sx={{ color: '#fff' }} primary="Painel" />}
        </ListItem>

        {/* Suporte */}
        <ListItem button>
          <ListItemIcon sx={{ color: '#fff' }}>
            <SupportIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText sx={{ color: '#fff' }} primary="dashboard" />}
        </ListItem>

        {/* Softphone */}
        <ListItem button>
          <ListItemIcon sx={{ color: '#fff' }}>
            <PhoneIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText sx={{ color: '#fff' }} primary="Softphone" />}
        </ListItem>

        {/* Modo escuro */}
        <ListItem button onClick={toggleDarkMode}>
          <ListItemIcon sx={{ color: '#fff' }}>
            <NightlightIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText sx={{ color: '#fff' }} primary="Modo Escuro" />}
        </ListItem>

        {/* Sair */}
        <ListItem button onClick={() => { localStorage.removeItem('ramal'); window.location.href = '/'; }}>
          <ListItemIcon sx={{ color: '#fff' }}>
            <LogoutIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText sx={{ color: '#fff' }} primary="Sair" />}
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
