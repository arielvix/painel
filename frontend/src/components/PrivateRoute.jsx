// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// Função para verificar se o usuário está autenticado (simulando com localStorage)
const isAuthenticated = () => {
  return !!localStorage.getItem("authToken"); // Supondo que o token de autenticação esteja no localStorage
};

const PrivateRoute = ({ element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />; // Redireciona para a página de login caso não esteja autenticado
  }

  return element; // Caso esteja autenticado, renderiza o componente da página
};

export default PrivateRoute;
