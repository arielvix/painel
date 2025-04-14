import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ImageIcon from "@mui/icons-material/Image";

const Chat = () => {
  const { ticketId } = useParams(); // Para capturar o ID do ticket
  const messages = [
    { id: 1, message: "Olá, como podemos ajudar você?", sender: "Equipe" },
    { id: 2, message: "Estou com problemas no meu pedido.", sender: "Ariel" },
    { id: 3, message: "Vamos resolver isso. O que aconteceu?", sender: "Equipe" },
  ]; // Mensagens estáticas para o chat

  return (
    <Grid container spacing={2}>
      {/* Tickets Sidebar */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Tickets</Typography>
          <Typography variant="body2">Ticket #{ticketId}</Typography>
        </Paper>
      </Grid>

      {/* Área de Chat */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h6">Ticket {ticketId}</Typography>

          {/* Exibição das mensagens no chat */}
          <Box sx={{ maxHeight: "400px", overflowY: "scroll", marginBottom: 2 }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: msg.sender === "Equipe" ? "row" : "row-reverse",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Paper
                  sx={{
                    backgroundColor: msg.sender === "Equipe" ? "#f0f0f0" : "#f97400",
                    color: msg.sender === "Equipe" ? "#000" : "#fff",
                    padding: "8px 16px",
                    borderRadius: "16px",
                    maxWidth: "60%",
                    margin: "5px",
                  }}
                >
                  <Typography variant="body2">{msg.message}</Typography>
                </Paper>
              </Box>
            ))}
          </Box>

          {/* Apenas exibindo o botão de áudio e imagem sem interação */}
          <Box sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}>
            <Paper sx={{ padding: 1 }}>
              <MusicNoteIcon /> Enviar Áudio
            </Paper>

            <Paper sx={{ padding: 1 }}>
              <ImageIcon /> Enviar Imagem
            </Paper>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Chat;
