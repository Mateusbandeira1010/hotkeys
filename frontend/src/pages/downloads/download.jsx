import React from 'react';
import styles from '../../assets/styles/download.module.css'

const Download = () => {
  // Dados fictícios dos clientes
  const clients = [
    {
      id: 1,
      name: 'OTClient V8',
      description: 'Versão mais recente alterado por Blitz',
      version: '5.2',
      releaseDate: '02/04/2025',
      fileSize: '25 MB',
      downloadLink: '#'
    },
    {
      id: 2,
      name: 'Tibia 8.60 (Cliente Proprio e Maneiro)',
      description: 'Versão simplificada para usuários de PUSH e PVP',
      version: '8.2',
      releaseDate: '02/04/2025',
      fileSize: '2.350 KB',
      downloadLink: '#'
    },
    {
      id: 3,
      name: 'Elf bot',
      description: 'Versão com um pack de script',
      version: '8.2',
      releaseDate: '02/04/2025',
      fileSize: '32 MB',
      downloadLink: '#'
    },

    {
      id: 4,
      name: 'Ip Change',
      description: 'Todas as versões',
      version: 'Todas versões',
      releaseDate: '02/04/2025',
      fileSize: '30 MB',
      downloadLink: '#'
    },

    {
      id: 5,
      name: 'Sprites',
      description: 'Sprites para o OTClient V8',
      releaseDate: '02/04/2025',
      downloadLink: '#'
    },

    {
      id: 6,
      name: 'Data',
      description: 'Data para o OTClient V8',
      releaseDate: '02/04/2025',
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