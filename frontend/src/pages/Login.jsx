import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import '../../styles/styles.css';  // Importando o arquivo CSS

export default function Login() {
  const navigate = useNavigate();
  const [ramal, setRamal] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  
  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage('');
  
    try {
      const response = await axios.post('http://localhost:8000/login', { ramal, senha });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('ramal', ramal); // opcional
      navigate('/home');  // Corrigido para minúsculo
    } catch (error) {
      setErrorMessage('Ramal ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };
  

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Box
    className="login-background" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}
    >
    {/* Fundo animado com os foguetes */}
    <div className="bg">
    <div className="rocket"></div> {/* Foguete em cima */}
    <div className="rocket2"></div> {/* Foguete embaixo */}
  </div>



      {/* Conteúdo do login */}
      <Paper
        elevation={6}
        sx={{
          padding: '30px 0px',
          width: '100%',
          maxWidth: 280,
          borderRadius: '20px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          backgroundColor: '#fff',
        }}
      >
        {/* Logo centralizado */}
        <div className="logo">
          <img src="/logo.png" alt="CNX Tecnologia" style={{ width: '150px', marginBottom: '20px' }} />
        </div>
        
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#f97400',
            marginBottom: '16px',
          }}
        >
        </Typography>

        {errorMessage && <Typography color="error" sx={{ marginBottom: '10px' }}>{errorMessage}</Typography>}

        <TextField
  label="Login"
  variant="outlined"
  fullWidth
  margin="normal"
  value={ramal}
  onChange={(e) => setRamal(e.target.value)}
  onKeyDown={handleKeyDown}
  sx={{
    '& .MuiOutlinedInput-root': {
      borderRadius: '30px',
      backgroundColor: '#f8f8f8',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#f97400',
      },
    },
    width: '80%', // Ou defina um valor específico, como '300px' ou '80%'
  }}
/>

<TextField
  label="Senha"
  variant="outlined"
  type="password"
  fullWidth
  margin="normal"
  value={senha}
  onChange={(e) => setSenha(e.target.value)}
  onKeyDown={handleKeyDown}
  sx={{
    '& .MuiOutlinedInput-root': {
      borderRadius: '30px',
      backgroundColor: '#f8f8f8',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#f97400',
      },
    },
    width: '80%', // Ou defina um valor específico, como '300px' ou '80%'
  }}
/>

<Button
  variant="contained"
  sx={{
    width: '80%',  // Aqui você define a largura do botão (exemplo: '100%' ou '300px')
    mt: 3,
    backgroundColor: '#f97400',
    color: '#fff',
    borderRadius: '30px',
    padding: '12px 16px',
    textTransform: 'none',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    '&:hover': {
      backgroundColor: '#e56b00',
      boxShadow: '0 6px 14px rgba(0, 0, 0, 0.2)',
    },
    '&:disabled': {
      backgroundColor: '#f8f8f8',
    },
  }}
  onClick={handleLogin}
  disabled={loading}
>
  {loading ? 'Carregando...' : 'ENTRAR'}
</Button>

      </Paper>
    </Box>
  );
}
