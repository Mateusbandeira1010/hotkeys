import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from './assets/styles/app.module.css';

function App() {
  const [username, setUsername] = useState(null);

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
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>Blitz Hotkeys</h1>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/hotkey">Hotkeys</Link></li>
            <li><Link to="/download">Download</Link></li>
            {username ? (
              <>
                <li><Link to="/perfil">Bem-vindo, {username}</Link></li>
                <li><button onClick={handleLogout}>Sair</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/cad">Cadastre-se</Link></li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
