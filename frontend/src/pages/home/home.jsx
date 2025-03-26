import React from 'react';
import styles from '../../assets/styles/home.module.css';

function Home() {
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

      {/* Seção Características */}
      <section className={styles.caracteristicas} id="caracteristicas">
        <h3>Características</h3>
        <ul>
          <li>Fácil configuração de atalhos</li>
          <li>Suporte a múltiplas plataformas</li>
          <li>Interface intuitiva e simples de usar</li>
          <li>Funciona em segundo plano sem afetar seu desempenho</li>
        </ul>
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
