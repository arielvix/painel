import React, { useEffect } from "react";
import { Box } from "@mui/material";

const Faturas = () => {
  useEffect(() => {
    // Carregar o script do Elfsight PDF Embed dinamicamente
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // Remover fundo, margens e padding do body somente para esta página
    document.body.style.backgroundColor = 'transparent';  // Remover fundo do body
    document.body.style.margin = '0';  // Remover margens
    document.body.style.padding = '0';  // Remover padding

    // Limpeza do script após o componente ser desmontado
    return () => {
      document.body.removeChild(script);
      document.body.style.backgroundColor = '';  // Restaurar fundo do body
      document.body.style.margin = '';  // Restaurar margens
      document.body.style.padding = '';  // Restaurar padding
    };
  }, []);

  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        height: "100vh", // Garantir que ocupe toda a altura da tela
        width: "100%", // Garantir que ocupe toda a largura
        overflow: "hidden", // Impede que o conteúdo ultrapasse a área visível
        position: "relative", // Garante o posicionamento correto
        backgroundColor: "#fff", // Fundo branco para o conteúdo da página
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)", // Sombra suave ao redor do container
      }}
    >
      {/* Div onde o Elfsight PDF Embed será exibido */}
      <div
        className="elfsight-app-2a9b42be-1ec5-424b-96b9-93b72b2a89aa"
        data-elfsight-app-lazy
        style={{
          width: "100%",
          height: "100%",
          border: "none", // Remover bordas do iframe
          borderRadius: "0px", // Remover qualquer arredondamento de bordas
        }}
      />
    </Box>
  );
};

export default Faturas;
