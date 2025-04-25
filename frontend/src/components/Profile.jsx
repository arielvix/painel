import React from 'react';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Ícone de perfil

const SimpleIcon = () => {
  return (
    <IconButton>
      <AccountCircleIcon sx={{
        color: 'rgb(255, 230, 0)', // Cor com alpha (transparência) usando RGBA
        fontSize: '35px',
        padding: '6px',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': { 
          transform: 'scale(1.2)', 
          color: 'rgb(7, 177, 250)' // Cor mais intensa no hover
        }
      }} />
    </IconButton>
  );
};

export default SimpleIcon;
