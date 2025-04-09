import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/styles/login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const navigate = useNavigate();  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('username', data.username);
        localStorage.setItem('token', data.token);

        setShowLoginMessage(true);

        // Espera 2 segundos para redirecionar
        setTimeout(() => {
          navigate('/perfil');
          window.location.reload();
        }, 2000);
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      alert('Erro ao se conectar ao servidor!');
    }
  };

  return (
    <div className={styles.loginContainer}> 
      {showLoginMessage && (
        <div className={styles.loginMessage}>
          Login realizado com sucesso. Redirecionando...
        </div>
      )}

      {!showLoginMessage && (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder='Digite seu Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Senha:</label>
            <input
              type="password"
              name="password"
              placeholder='Digite sua Senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Entrar</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
