import React from 'react';
import { Box } from '@mui/material';

const VirtualAssistant = () => {
  return (
    <Box sx={{ position: 'fixed', bottom: 10, right: 20 }}>
      {/* Iframe carregando o link diretamente */}
      <iframe
        src="https://64aa22dee3164672b2e8f2a49a3f5709.elf.site"
        width="350px"
        height="450px"
        style={{
          border: 'none',
          borderRadius: '10px',
        }}
      />
    </Box>
  );
};

export default VirtualAssistant;
