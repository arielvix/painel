import React, { useEffect } from 'react';

const IframeElfsightPage = () => {
  useEffect(() => {
    // Carregar o script do Elfsight PDF Embed dinamicamente
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // Limpeza do script após o componente ser desmontado
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ height: '65vh', width: '120vh' }}>
      {/* Contêiner do Elfsight Widget */}
      <div
        className="elfsight-app-2a9b42be-1ec5-424b-96b9-93b72b2a89aa"
        data-elfsight-app-lazy
        style={{
          width: '120',
          height: '700', // Ajusta a altura para ocupar a tela inteira
          border: 'none',
        }}
      />
    </div>
  );
};

export default IframeElfsightPage;
