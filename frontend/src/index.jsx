import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Certifique-se de que o caminho para o App está correto
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // 'root' é o id no arquivo index.html
root.render(<App />);
