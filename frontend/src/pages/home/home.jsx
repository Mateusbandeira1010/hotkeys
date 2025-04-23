import React, { useState, useEffect } from 'react';
import styles from '../../assets/styles/home.module.css';

function Home() {
  const [hotkeys, setHotkeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchPublicHotkeys = async () => {
    try {
      setLoading(true);
      setError(null);
      const startTime = Date.now();
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/hotkeys/public`, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
      
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success || !Array.isArray(result.data)) {
        throw new Error('Estrutura de resposta inválida');
      }
      

      setHotkeys(result.data);
      

    } catch (err) {
      console.error('Erro na requisição:', err);
      setError(err.message || 'Erro desconhecido ao carregar hotkeys');
      setHotkeys([]);
      
      // Tentar novamente após 5 segundos (máximo 3 tentativas)
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, 5000);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicHotkeys();
  }, [retryCount]);

  return (
    <div className={styles.home}>
      {/* Seção de Boas-vindas */}
      <section className={styles.welcome}>
        <h2>Bem-vindo à Página Inicial!</h2>
        <p>Transforme sua produtividade com a melhor ferramenta de hotkeys do mercado.</p>
        <p>Você pode navegar para outras páginas usando o menu acima.</p>
      </section>

      {/* Seção Sobre */}
      <section className={styles.sobre} id="sobre">
        <h3>Sobre o Blitz Hotkeys</h3>
        <p>Blitz Hotkeys é a ferramenta definitiva para aumentar sua produtividade. Organize e gerencie suas teclas de atalho de maneira simples e intuitiva.</p>
      </section>

      {/* Seção de Hotkeys Públicas */}
      <section className={styles.hotkeysPublicas} id="hotkeys">
        <h3>Hotkeys Recem Criadas</h3>
        
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Carregando hotkeys...</p>
            {retryCount > 0 && (
              <p className={styles.retryMessage}>
                Tentativa {retryCount + 1} de 3
              </p>
            )}
          </div>
        ) : error ? (
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>{error}</p>
            <button 
              className={styles.retryButton}
              onClick={() => setRetryCount(prev => prev + 1)}
              disabled={retryCount >= 3}
            >
              {retryCount >= 3 ? 'Máximo de tentativas' : 'Tentar novamente'}
            </button>
          </div>
        ) : hotkeys.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Nenhuma hotkey pública disponível</p>
            <p>Cadastre novas hotkeys para vê-las aqui</p>
          </div>
        ) : (
          <div className={styles.hotkeyGrid}>
            {hotkeys.map((item) => (
              <div key={item.id} className={styles.hotkeyCard}>
                <div className={styles.hotkeyHeader}>
                  <span className={styles.hotkeyCombo}>{item.hotkey}</span>
                  {item.author && (
                    <span className={styles.hotkeyAuthor}>criado por {item.author}</span>
                  )}
                </div>
                
                {item.description && (
                  <p className={styles.hotkeyDescription}>{item.description}</p>
                )}
                
                <div className={styles.hotkeyFooter}>
                  <span className={styles.hotkeyDate}>
                    {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Seção de Contato */}
      <section className={styles.contato} id="contato">
        <h3>Entre em Contato</h3>
        <p>Se tiver alguma dúvida ou feedback, sinta-se à vontade para entrar em contato conosco.</p>
        <p>Email: contato@blitzhotkeys.com</p>
      </section>
    </div>
  );
}

export default Home;