import React, { useState } from "react";
import { Box, Typography, Grid, Paper, Button, Tab, Tabs, IconButton } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import CallIcon from "@mui/icons-material/Call";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CallCenter = () => {
  const [tabValue, setTabValue] = useState(0); // Para controlar as abas
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  
  // Dados de exemplo para os gráficos
  const data = [
    { name: "Jan", atendidas: 30, emEspera: 10, finalizadas: 20 },
    { name: "Feb", atendidas: 50, emEspera: 20, finalizadas: 30 },
    { name: "Mar", atendidas: 80, emEspera: 40, finalizadas: 60 },
    { name: "Apr", atendidas: 70, emEspera: 50, finalizadas: 30 },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", color: "#f97400" }}>
        Call Center - Painel de Gestão
      </Typography>

      {/* Abas para separar os componentes */}
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Chamadas" />
        <Tab label="Estatísticas" />
        <Tab label="Discador" />
      </Tabs>

      {/* Abaixo, as abas */}
      <Grid container spacing={3}>
        {/* Chamadas */}
        {tabValue === 0 && (
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3 }}>
              <Typography variant="h6">Chamadas Ativas</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <Button variant="contained" startIcon={<PhoneInTalkIcon />} sx={{ backgroundColor: "#4CAF50" }}>
                  Atender
                </Button>
                <Button variant="contained" startIcon={<PhoneMissedIcon />} sx={{ backgroundColor: "#f44336" }}>
                  Finalizar
                </Button>
              </Box>
              {/* Lista de Chamadas Ativas */}
              <Paper sx={{ padding: 2 }}>
                <Typography variant="body1">Chamada 1: 12345 - Em espera</Typography>
                <Typography variant="body1">Chamada 2: 67890 - Em andamento</Typography>
              </Paper>
            </Paper>
          </Grid>
        )}

        {/* Estatísticas */}
        {tabValue === 1 && (
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3 }}>
              <Typography variant="h6">Estatísticas de Chamadas</Typography>
              {/* Filtro de data */}
              <DatePicker
                selected={dateRange[0]}
                onChange={(dates) => setDateRange(dates)}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                selectsRange
                inline
              />
              {/* Gráfico de Chamadas */}
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="atendidas" stroke="#4CAF50" />
                  <Line type="monotone" dataKey="emEspera" stroke="#FF9800" />
                  <Line type="monotone" dataKey="finalizadas" stroke="#f44336" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        )}

        {/* Discador */}
        {tabValue === 2 && (
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3 }}>
              <Typography variant="h6">Discador</Typography>
              {/* Discador Moderno */}
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <PhoneIcon sx={{ fontSize: 50, color: "#f97400", marginRight: 2 }} />
                <input
                  type="tel"
                  placeholder="Digite o número"
                  style={{
                    fontSize: "18px",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #f97400",
                    width: "200px",
                    textAlign: "center",
                  }}
                />
                <IconButton sx={{ backgroundColor: "#4CAF50", color: "#fff", marginLeft: 2 }}>
                  <CallIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CallCenter;
