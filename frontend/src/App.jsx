import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from './assets/styles/app.module.css';

function App() {
  const [username, setUsername] = useState(null);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const loginMessage = localStorage.getItem('loginMessage');

    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Exibe mensagem de login, se houver
    if (loginMessage === 'true') {
      setShowLoginMessage(true);

      setTimeout(() => {
        setShowLoginMessage(false);
        localStorage.removeItem('loginMessage');
        window.location.reload();
      }, 2000);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUsername(null);
    setShowLogoutMessage(true);

    setTimeout(() => {
      setShowLogoutMessage(false);
      navigate('/');
      window.location.reload();
    }, 2000);
  };

  return (
    <div className={styles.app}>
      {/* Mensagens de login/logout */}
      {showLoginMessage && (
        <div className={styles.logoutMessage}>
          Login realizado com sucesso. Redirecionando...
        </div>
      )}
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
            <li className={styles.navItem}><Link to="/discord" className={styles.navLink}>Discord</Link></li>
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
