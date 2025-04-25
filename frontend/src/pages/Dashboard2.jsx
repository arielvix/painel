import React, { useState } from 'react';
import { Container, Grid, Paper, Card, CardContent, Typography, TextField, Button, Stack, Box, MenuItem, Select, InputLabel, FormControl, IconButton } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';
import { ResizableBox } from 'react-resizable'; // Importa a biblioteca de redimensionamento
import 'react-resizable/css/styles.css'; // Importa os estilos de redimensionamento
import FileDownloadIcon from '@mui/icons-material/FileDownload'; // Ícone de download
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Ícone para expandir filtro
import ExpandLessIcon from '@mui/icons-material/ExpandLess'; // Ícone para recolher filtro

const COLORS = ['#f97400', '#ffa94d', '#00C49F', '#FFBB28', '#8884d8', '#0088FE', '#00BCD4', '#4CAF50', '#FF8042'];

export default function Dashboard() {
  const [ramaisOnline, setRamaisOnline] = useState(50);
  const [totalLigacoes, setTotalLigacoes] = useState(150);
  const [tempoMedio, setTempoMedio] = useState("00:05:30");
  const [pieData, setPieData] = useState([
    { name: "Ramal 1", value: 40 },
    { name: "Ramal 2", value: 30 },
    { name: "Ramal 3", value: 30 }
  ]);
  const [rows, setRows] = useState([
    { id: 1, from_no: "ext.519", to_no: "ext.530", duration: "00:03:10", time_end: "2025-04-12 14:30" },
    { id: 2, from_no: "ext.520", to_no: "ext.531", duration: "00:05:20", time_end: "2025-04-12 15:30" },
    { id: 3, from_no: "ext.521", to_no: "ext.532", duration: "00:04:15", time_end: "2025-04-12 16:00" }
  ]);
  
  const [ramalOptions] = useState(["ext.519", "ext.520", "ext.521", "ext.522", "ext.523"]); // Lista de ramais estáticos
  const [selectedRamal, setSelectedRamal] = useState(''); // Para armazenar o ramal selecionado
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false); // Controla a abertura do filtro

  const fetchDashboardData = () => {
    // Dados estáticos para simulação
    setRamaisOnline(50);
    setTotalLigacoes(150);
    setTempoMedio("00:05:30");
    setPieData([
      { name: "Ramal 1", value: 40 },
      { name: "Ramal 2", value: 30 },
      { name: "Ramal 3", value: 30 }
    ]);
    setRows([
      { id: 1, from_no: "ext.519", to_no: "ext.530", duration: "00:03:10", time_end: "2025-04-12 14:30" },
      { id: 2, from_no: "ext.520", to_no: "ext.531", duration: "00:05:20", time_end: "2025-04-12 15:30" },
      { id: 3, from_no: "ext.521", to_no: "ext.532", duration: "00:04:15", time_end: "2025-04-12 16:00" }
    ]);
  };

  const columns = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'from_no', headerName: 'Ramal de Origem', flex: 1 },
    { field: 'to_no', headerName: 'Ramal de Destino', flex: 1 },
    { field: 'duration', headerName: 'Duração', width: 160 },
    { field: 'time_end', headerName: 'Data/Hora do Término', width: 180 },
  ];

  const handleExport = (type) => {
    alert(`Exportando relatório para ${type}`);
    // Adicione a lógica de exportação para CSV ou PDF aqui
  };

  return (
    <Container maxWidth="xl" sx={{ padding: 2 }}>
      {/* Filtro Expansível no Canto Esquerdo */}
      <Grid container spacing={3} mb={2} justifyContent="flex-start">
      <Grid item xs={12} sm={4} md={3} lg={2}>
  <Paper elevation={3} sx={{ backgroundColor: '#fff', p: 2, borderRadius: 4, height: 'fit-content', minWidth: '50px' }}>
    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
      <IconButton onClick={() => setFiltersOpen(!filtersOpen)} sx={{ fontSize: '20px', color: '#f97400' }}>
        {filtersOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
      
      {filtersOpen && (
        <>
          <FormControl sx={{ width: '150px' }}>
            <InputLabel id="ramal-select-label">Ramal</InputLabel>
            <Select
              labelId="ramal-select-label"
              value={selectedRamal}
              onChange={(e) => setSelectedRamal(e.target.value)}
              displayEmpty
              label="Ramal"
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              {ramalOptions.map((ramal, index) => (
                <MenuItem key={index} value={ramal}>{ramal}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Data Inicial"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            sx={{ width: '150px' }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Data Final"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            sx={{ width: '150px' }}
            InputLabelProps={{ shrink: true }}
          />
        </>
      )}

      <IconButton onClick={fetchDashboardData} sx={{ backgroundColor: '#f97400', color: '#fff', padding: '10px' }}>
        <FileDownloadIcon sx={{ fontSize: '20px' }} />
      </IconButton>
    </Stack>
  </Paper>
</Grid>


        {/* Cards de Estatísticas */}
        <Grid item xs={12} sm={8} md={9} lg={10}>
          <Grid container spacing={3} justifyContent="center">
            {[{ label: "Ramais Online", value: ramaisOnline }, { label: "Total de Ligações", value: totalLigacoes }, { label: "Tempo Médio", value: tempoMedio }].map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ backgroundColor: '#fff', color: '#f97400', borderRadius: 4, height: 140 }}>
                  <CardContent>
                    <Typography variant="subtitle1">{card.label}</Typography>
                    <Typography variant="h3" fontWeight="bold">{card.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Gráfico de PieChart */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={12} lg={10}>
          <Paper sx={{ p: 3, backgroundColor: '#fff', borderRadius: 4 }}>
            <Typography variant="h6" sx={{ color: '#f97400', fontWeight: 'bold', mb: 2 }}>Ligação por Ramal</Typography>
            <ResizableBox width={500} height={350} axis="y" minConstraints={[300, 350]} maxConstraints={[700, 600]}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" labelLine={false} outerRadius={130} dataKey="value" nameKey="name" label={({ percent }) => `${(percent * 100).toFixed(1)}%`}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ResizableBox>
          </Paper>
        </Grid>

        {/* Tabela de Histórico de Ligações */}
        <Grid item xs={12} md={12} lg={10}>
          <Paper sx={{ p: 3, backgroundColor: '#fff', borderRadius: 4 }}>
            <Typography variant="h6" sx={{ color: '#f97400', fontWeight: 'bold', mb: 2 }}>Histórico de Ligações</Typography>
            <ResizableBox width={500} height={350} axis="y" minConstraints={[300, 350]} maxConstraints={[700, 600]}>
              <Box sx={{ height: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} sx={{ border: 'none', '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f97400', color: '#fff' }, '& .MuiDataGrid-cell': { color: '#333' } }} />
              </Box>
            </ResizableBox>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
