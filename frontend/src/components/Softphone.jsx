import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Button, Grid } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import SpeakerIcon from '@mui/icons-material/VolumeUp';
import MicIcon from '@mui/icons-material/Mic';
import DialpadIcon from '@mui/icons-material/Dialpad';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import RedoIcon from '@mui/icons-material/Redo';
import { styled } from '@mui/system';
import Layout from '../components/Layout'; // Importando o Layout

const SoftphoneContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '320px',  // 20% menor que antes (300px para 240px)
  height: '450px',  // 20% menor que antes (500px para 400px)
  backgroundColor: '#121212',
  borderRadius: '20px',
  padding: '16px', // Ajuste no padding
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  color: 'white',
}));

const CallButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#4CAF50',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#388E3C',
  },
  padding: '12px',  // Botão menor
  borderRadius: '50%',
  fontSize: '22px',  // Botão menor
  transition: 'transform 0.2s',
  marginTop: '16px', // Menos espaço
  '&:active': {
    transform: 'scale(0.9)',
  },
}));

const EndCallButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#F44336',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#D32F2F',
  },
  padding: '12px', // Botão menor
  borderRadius: '50%',
  fontSize: '22px',  // Botão menor
  marginTop: '8px',
  transition: 'transform 0.2s',
  '&:active': {
    transform: 'scale(0.9)',
  },
}));

const MuteButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#FF9800',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#F57C00',
  },
  padding: '12px',  // Botão menor
  borderRadius: '50%',
  fontSize: '22px',  // Botão menor
  marginTop: '8px',
  transition: 'transform 0.2s',
  '&:active': {
    transform: 'scale(0.9)',
  },
}));

const RedialButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#2196F3',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1976D2',
  },
  padding: '12px',  // Botão menor
  borderRadius: '50%',
  fontSize: '22px',  // Botão menor
  marginTop: '8px',
  transition: 'transform 0.2s',
  '&:active': {
    transform: 'scale(0.9)',
  },
}));

const NumberButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#333',
  color: '#fff',
  fontSize: '16px',  // Botões menores
  padding: '16px',  // Botão menor
  width: '50px',  // Botão menor
  height: '50px',  // Botão menor
  borderRadius: '50%',
  margin: '8px', // Menos espaçamento
  '&:hover': {
    backgroundColor: '#555',
  },
}));

const Softphone = () => {
  const [callStatus, setCallStatus] = useState('Idle');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lastDialed, setLastDialed] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);

  useEffect(() => {
    // Solicita permissão para o microfone assim que o componente é montado
    const requestMicrophonePermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasMicrophonePermission(true);
      } catch (error) {
        setHasMicrophonePermission(false);
        console.error('Permissão para o microfone negada:', error);
      }
    };

    requestMicrophonePermission();
  }, []);

  const handleCall = () => {
    if (!hasMicrophonePermission) {
      alert('Por favor, conceda permissão para usar o microfone.');
      return;
    }
    setCallStatus('Calling...');
    setLastDialed(phoneNumber);
  };

  const handleEndCall = () => {
    setCallStatus('Idle');
    setPhoneNumber('');
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleRedial = () => {
    setPhoneNumber(lastDialed);
  };

  const handleNumberClick = (number) => {
    setPhoneNumber((prevNumber) => prevNumber + number);
  };

  return (
    <SoftphoneContainer>
      <Typography variant="h6">Softphone</Typography>
      
      {/* Display number */}
      <Typography variant="h4" sx={{ marginTop: '16px' }}>
        {phoneNumber || '0'}
      </Typography>

      {/* Number pad */}
      <Grid container spacing={1} justifyContent="center">
        {[1, 2, 3].map((num) => (
          <Grid item key={num}>
            <NumberButton onClick={() => handleNumberClick(num)}>{num}</NumberButton>
          </Grid>
        ))}
        {[4, 5, 6].map((num) => (
          <Grid item key={num}>
            <NumberButton onClick={() => handleNumberClick(num)}>{num}</NumberButton>
          </Grid>
        ))}
        {[7, 8, 9].map((num) => (
          <Grid item key={num}>
            <NumberButton onClick={() => handleNumberClick(num)}>{num}</NumberButton>
          </Grid>
        ))}
        <Grid item>
          <NumberButton onClick={() => handleNumberClick('*')}>*</NumberButton>
        </Grid>
        <Grid item>
          <NumberButton onClick={() => handleNumberClick(0)}>0</NumberButton>
        </Grid>
        <Grid item>
          <NumberButton onClick={() => handleNumberClick('#')}>#</NumberButton>
        </Grid>
      </Grid>

      {/* Call and End Call buttons */}
      {callStatus === 'Idle' && (
        <CallButton onClick={handleCall}>
          <CallIcon />
        </CallButton>
      )}
      {callStatus === 'Calling...' && (
        <EndCallButton onClick={handleEndCall}>
          <CallEndIcon />
        </EndCallButton>
      )}

      {/* Additional buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '16px' }}>
        <IconButton sx={{ color: 'white' }} onClick={handleMute}>
          {isMuted ? <VolumeOffIcon /> : <MicIcon />}
        </IconButton>
        <RedialButton sx={{ color: 'white' }} onClick={handleRedial}>
          <RedoIcon />
        </RedialButton>
      </Box>
    </SoftphoneContainer>
  );
};

export default Softphone;
