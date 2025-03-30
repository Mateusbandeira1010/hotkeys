import React from 'react';
import styles from '../../assets/styles/download.module.css'

const Download = () => {
  // Dados fictícios dos clientes
  const clients = [
    {
      id: 1,
      name: 'Cliente Corporativo v2.1',
      description: 'Versão mais recente do cliente para empresas',
      version: '2.1.0',
      releaseDate: '15/10/2023',
      fileSize: '45 MB',
      downloadLink: '#'
    },
    {
      id: 2,
      name: 'Cliente Básico v1.8',
      description: 'Versão simplificada para usuários individuais',
      version: '1.8.2',
      releaseDate: '05/09/2023',
      fileSize: '32 MB',
      downloadLink: '#'
    },
    {
      id: 3,
      name: 'Cliente Básico v1.8',
      description: 'Versão simplificada para usuários individuais',
      version: '1.8.2',
      releaseDate: '05/09/2023',
      fileSize: '32 MB',
      downloadLink: '#'
    }
  ];

  const handleDownload = (clientName) => {
    alert(`Download iniciado: ${clientName}`);
    // Aqui você implementaria a lógica real com DownloadManager
  };

  return (
    <div className={styles.downloadPage}>
      <header className={styles.downloadHeader}>
        <h1 className={styles.title}>Downloads Disponíveis</h1>
        <p className={styles.subtitle}>Baixe a versão mais recente do nosso software</p>
      </header>
      
      <div className={styles.downloadList}>
        {clients.map(client => (
          <div key={client.id} className={styles.downloadCard}>
            <div className={styles.clientInfo}>
              <h2 className={styles.clientName}>{client.name}</h2>
              <p className={styles.clientDescription}>{client.description}</p>
              <div className={styles.clientDetails}>
                <span>Versão: {client.version}</span>
                <span>Lançamento: {client.releaseDate}</span>
                <span>Tamanho: {client.fileSize}</span>
              </div>
            </div>
            <button 
              className={styles.downloadButton}
              onClick={() => handleDownload(client.name)}
            >
              Download
            </button>
          </div>
        ))}
      </div>
      
      <div className={styles.downloadNotes}>
        <h3 className={styles.sectionTitle}>Instruções de Instalação</h3>
        <ol className={styles.instructionsList}>
          <li>Baixe o arquivo correspondente ao seu sistema</li>
          <li>Execute o instalador</li>
          <li>Siga as instruções na tela</li>
        </ol>
      </div>
    </div>
  );
};

export default Download;