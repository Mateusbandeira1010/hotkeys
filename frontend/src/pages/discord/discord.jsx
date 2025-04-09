import { useEffect } from "react";
import styles from "../../assets/styles/discord.module.css";
import blitzImg from '../../assets/imgs/Blitzzone.png';

const Discord = () => {
  useEffect(() => {
    document.title = "Discord - Blitz Hotkeys";
  }, []);

  return (
    <div className={styles.discordContainer}>
      <header className={styles.header}>
        <h1>🎧 Discord Blitz Hotkeys</h1>
        <p>Bem-vindo ao nosso servidor oficial no Discord!</p>
        <a
          href="https://discord.com/channels/@me"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.discordButton}
        >
          Acesse o nosso Discord
        </a>
      </header>

      <img
        src={blitzImg}
        alt="Logo Blitzzone"
        className={styles.discordImage}
      />

      <section className={styles.features}>
        <h2>✨ O que você vai encontrar lá</h2>
        <ul>
          <li>🔥 Macros personalizadas</li>
          <li>⚔️ Hotkeys Elfbot</li>
          <li>🤖 Bot 100% AFK</li>
          <li>💬 Canal de Feedback</li>
          <li>📢 Notícias e Updates</li>
          <li>🗺️ CaveBots</li>
          <li>🛠️ Functions avançadas</li>
          <li>📸 Screenshots da comunidade</li>
          <li>📦 Spr-Data atualizados</li>
        </ul>
      </section>
    </div>
  );
};

export default Discord;
