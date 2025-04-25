import React from "react";
import { Grid, Paper, Typography, Box, IconButton, InputBase } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ImageIcon from "@mui/icons-material/Image";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useParams } from "react-router-dom";

const Chat = () => {
  const { ticketId } = useParams();
  const messages = [
    { id: 1, message: "Olá, como podemos ajudar você?", sender: "Equipe" },
    { id: 2, message: "Estou com problemas no meu pedido.", sender: "Ariel" },
    { id: 3, message: "Vamos resolver isso. O que aconteceu?", sender: "Equipe" },
  ];

  return (
    <Box sx={{ display: "flex", height: "80vh", width: "100%" }}>
      {/* Sidebar interna encostada na sidebar do layout */}
      <Box
        sx={{
          width: "280px",
          backgroundColor: "#f4f4f4",
          borderRight: "1px solid #ccc",
          display: "flex",
          flexDirection: "column",
          padding: 2,
          gap: 1,
        }}
      >
        <Typography variant="h6" sx={{ color: "#f97400" }}>Conversas</Typography>
        {[1, 2, 3].map((id) => (
          <Paper
            key={id}
            onClick={() => (window.location.href = `/chat/${id}`)}
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: ticketId === String(id) ? "#f97400" : "#fff",
              color: ticketId === String(id) ? "#fff" : "#333",
              cursor: "pointer",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "#ff7f32",
                color: "#fff"
              }
            }}
          >
            <Typography variant="body2">Ticket #{id}</Typography>
          </Paper>
        ))}
      </Box>

      {/* Área de chat com fundo estilo WhatsApp */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundImage: "url('/public/wallpaper.png')", // você pode trocar por outro fundo estilo WhatsApp
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: 2,
          position: "relative",
        }}
      >
        {/* Mensagens */}
        <Box sx={{ flex: 1, overflowY: "auto", mb: 2, pr: 1 }}>
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: msg.sender === "Equipe" ? "row" : "row-reverse",
                mb: 1,
              }}
            >
              <Paper
                sx={{
                  backgroundColor: msg.sender === "Equipe" ? "#fff" : "#dcf8c6",
                  color: "#000",
                  p: 1.2,
                  px: 2,
                  borderRadius: "16px",
                  maxWidth: "70%",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <Typography variant="body2">{msg.message}</Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        {/* Caixa de mensagem estilo WhatsApp */}
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "30px",
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1,
            boxShadow: "0 0 6px rgba(0,0,0,0.15)",
          }}
        >
          <IconButton>
            <EmojiEmotionsIcon sx={{ color: "#888" }} />
          </IconButton>
          <IconButton>
            <AttachFileIcon sx={{ color: "#888" }} />
          </IconButton>
          <InputBase
            placeholder="Digite uma mensagem"
            sx={{ flex: 1, ml: 1 }}
          />
          <IconButton>
            <SendIcon sx={{ color: "#f97400" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
