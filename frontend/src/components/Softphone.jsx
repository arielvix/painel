import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  Paper
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import BackspaceIcon from '@mui/icons-material/Backspace';
import SearchIcon from '@mui/icons-material/Search';

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

const Softphone = () => {
  const [input, setInput] = useState('');

  const handleKeyPress = (value) => {
    setInput((prev) => prev + value);
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  return (
    <Box
      sx={{
        width: 220,
        height: 340,
        backgroundColor: '#2f2f2f',
        color: '#fff',
        borderRadius: 2,
        p: 1.5,
        boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Input */}
      <Paper
        sx={{
          p: '2px 6px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#fff',
          color: '#000',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, color: '#000', fontSize: 14 }}
          placeholder="Digite número..."
          value={input}
          disabled
        />
        <IconButton sx={{ color: '#000', p: 0.5 }}>
          <SearchIcon fontSize="small" />
        </IconButton>
      </Paper>

      {/* Teclado */}
      <Box
        sx={{
          mt: 1, // reduzido
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          rowGap: '10px',
          columnGap: '10px',
        }}
      >
        {numbers.map((num, index) => (
          <Box
            key={index}
            onClick={() => handleKeyPress(num)}
            sx={{
              width: 45,
              height: 45,
              borderRadius: '50%',
              backgroundColor: '#3c3c3c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#555',
              },
            }}
          >
            {num}
          </Box>
        ))}
      </Box>

      {/* Rodapé */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 0.5 }}>
        <IconButton sx={{ color: '#fff', p: 1 }}>
          <VideocamIcon fontSize="small" />
        </IconButton>
        <IconButton
          sx={{
            backgroundColor: '#fff',
            color: '#4caf50',
            p: 1.2,
            '&:hover': { backgroundColor: '#ccc' },
          }}
        >
          <PhoneIcon fontSize="small" />
        </IconButton>
        <IconButton sx={{ color: '#fff', p: 1 }} onClick={handleBackspace}>
          <BackspaceIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Softphone;
