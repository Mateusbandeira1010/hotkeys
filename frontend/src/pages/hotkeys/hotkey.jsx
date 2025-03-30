import React, { useState, useEffect } from "react";
import styles from "../../assets/styles/hotkey.module.css";

const Hotkey = () => {
  const [hotkeys, setHotkeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotkeys = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token não encontrado");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/profile/hotkeys`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }

        const data = await response.json();
        
        // Garante que vamos usar o array de hotkeys mesmo se a estrutura mudar
        const receivedHotkeys = data.hotkeys || [];
        
        if (!Array.isArray(receivedHotkeys)) {
          console.warn("Hotkeys não é um array:", receivedHotkeys);
          throw new Error("Formato de dados inválido");
        }

        setHotkeys(receivedHotkeys);

      } catch (err) {
        console.error("Erro ao carregar hotkeys:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotkeys();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Carregando suas hotkeys...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Erro: {error}</p>
        <button onClick={() => window.location.reload()}>
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Minhas Hotkeys</h1>
      <p className={styles.subtitle}>Total: {hotkeys.length} atalhos cadastrados</p>

      {hotkeys.length === 0 ? (
        <div className={styles.empty}>
          <p>Nenhuma hotkey encontrada</p>
          <p>Cadastre novas hotkeys para vê-las aqui</p>
        </div>
      ) : (
        <div className={styles.hotkeyGrid}>
          {hotkeys.map((item) => (
            <div key={item.id} className={styles.hotkeyCard}>
              <div className={styles.hotkeyHeader}>
                <h3>ID: {item.id}</h3>
                <span className={styles.userId}>Usuário: {item.userId}</span>
              </div>
              <div className={styles.keyCombination}>
                {item.hotkey || "Combinação não definida"}
              </div>
              <div className={styles.dates}>
                <span>Criado em: {new Date(item.createdAt).toLocaleString()}</span>
                <span>Atualizado em: {new Date(item.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hotkey;