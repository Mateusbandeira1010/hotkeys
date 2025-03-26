import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/styles/login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        console.log('Login bem-sucedido:', data.username);
        navigate('/perfil');
      } else {
        const errorData = await response.json();
        console.error('Erro ao fazer login:', errorData.message);
        alert(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Erro na requisição de login:', error);
      alert('Erro ao se conectar ao servidor!');
    }
  };

  return (
    <div className={styles.loginContainer}> 
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder='Digite seu Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Senha:</label>
        <input
          type="password"
          name="password"
          placeholder='Digite sua Senha'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
