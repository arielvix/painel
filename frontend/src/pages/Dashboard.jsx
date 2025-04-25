import React from 'react';

const IframePage = () => {
  return (
    <div style={{ 
      height: '100vh', 
      margin: 30, 
      padding: 60, 
      overflow: 'hidden' // Impede a rolagem da página
    }}>
      <iframe
        width="1200"
        height="650"
        src="https://lookerstudio.google.com/embed/reporting/8c4d0a5c-2202-4e71-853d-c444c51d2ef1/page/vuxGF"
        frameborder="0"
        style={{ border: '0' }}
        allowfullscreen
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      ></iframe>
    </div>
  );
};

export default IframePage;
