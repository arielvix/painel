import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Suporte from './pages/Suporte';
import Configuration from './pages/Configuration';
import Faturas from './pages/Faturas';          // Importando Faturas
import Softphone from './components/Softphone';    // Importando CallCenter
import Chat from './pages/Chat';                // Importando Chat

const App = () => {
  const isAuthenticated = localStorage.getItem('authToken'); // Verifica se o usuário está autenticado

  return (
    <Router>
      <Routes>
        {/* Página de Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Página inicial */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        
        {/* Layout comum para páginas protegidas */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/suporte" element={<Suporte />} />
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/faturas" element={<Faturas />} />        {/* Adicionando Faturas */}
          <Route path="/softphone" element={<Softphone />} />  {/* Adicionando Call Center */}
          <Route path="/chat" element={<Chat />} />              {/* Adicionando Chat */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
