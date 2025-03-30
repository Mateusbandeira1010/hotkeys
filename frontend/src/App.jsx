import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from './assets/styles/app.module.css';

function App() {
  const [username, setUsername] = useState(null);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUsername(null);
    setShowLogoutMessage(true);
    
    // Mostra mensagem por 2 segundos antes de redirecionar
    setTimeout(() => {
      setShowLogoutMessage(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className={styles.app}>
      {/* Mensagem de logout */}
      {showLogoutMessage && (
        <div className={styles.logoutMessage}>
          Logout realizado com sucesso. Redirecionando...
        </div>
      )}
      
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>Blitz Hotkeys</h1>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}><Link to="/" className={styles.navLink}>Home</Link></li>
            <li className={styles.navItem}><Link to="/hotkey" className={styles.navLink}>Hotkeys</Link></li>
            <li className={styles.navItem}><Link to="/download" className={styles.navLink}>Download</Link></li>
            {username ? (
              <>
                <li className={styles.navItem}>
                  <Link to="/perfil" className={styles.navLink}>
                    Bem-vindo, <span className={styles.username}>{username}</span>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <button onClick={handleLogout} className={styles.logoutButton}>
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className={styles.navItem}><Link to="/login" className={styles.navLink}>Login</Link></li>
                <li className={styles.navItem}><Link to="/cad" className={styles.navLink}>Cadastre-se</Link></li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;