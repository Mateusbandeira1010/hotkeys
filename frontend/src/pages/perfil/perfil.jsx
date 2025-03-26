import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../../assets/styles/perfil.module.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hotkeys, setHotkeys] = useState([]);
  const [newHotkey, setNewHotkey] = useState('');
  const [action, setAction] = useState('create');
  const [selectedHotkeyId, setSelectedHotkeyId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  // Função para obter o perfil do usuário
  const getProfile = async () => {
    if (!token) return setError('Token de autenticação não fornecido');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile`, { method: 'GET', headers });
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
        setIsLoggedIn(true);
      } else {
        setError(data.message);
      }
    } catch {
      setError('Erro de conexão');
    }
  };

  // Função para obter as hotkeys do usuário
  const getHotkeys = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile/hotkeys`, { method: 'GET', headers });
      const data = await response.json();
      if (response.ok) {
        setHotkeys(data.hotkeys || []);
      } else {
        setError(data.message);
      }
    } catch {
      setError('Erro de conexão');
    }
  };

  // Função para gerenciar as ações de hotkeys (criar, editar, deletar)
  const handleHotkeyAction = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile/hotkeys`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ hotkey: newHotkey, action, hotkeyId: selectedHotkeyId })
      });

      const data = await response.json();

      if (response.ok) {
        if (action === 'create') {
          setHotkeys([...hotkeys, data.hotkey]);
        } else if (action === 'update') {
          const updatedHotkeys = hotkeys.map(h => h.id === data.hotkey.id ? data.hotkey : h);
          setHotkeys(updatedHotkeys);
        } else if (action === 'delete') {
          const updatedHotkeys = hotkeys.filter(h => h.id !== selectedHotkeyId);
          setHotkeys(updatedHotkeys);
        }
        setNewHotkey('');
        setSelectedHotkeyId(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Erro de conexão');
    }
  };

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  // UseEffect para carregar o perfil e as hotkeys ao carregar o componente
  useEffect(() => {
    getProfile();
    getHotkeys();
  }, []);

  return (
    <div className={styles.perfilContainer}>
      {error && <p>{error}</p>}
      {profile && (
        <div>
          <h2>Bem-vindo, {profile.username}</h2>
          <h3>Suas Hotkeys:</h3>
          <ul>
            {hotkeys.map((hotkey) => (
              <li key={hotkey.id}>
                <pre>{hotkey.hotkey}</pre>
                <button className='edit-button' onClick={() => { setAction('update'); setNewHotkey(hotkey.hotkey); setSelectedHotkeyId(hotkey.id); }}>
                  Editar
                </button>
                <button className='delete-button' onClick={() => { setAction('delete'); setSelectedHotkeyId(hotkey.id); handleHotkeyAction(); }}>
                  Deletar
                </button>
              </li>
            ))}
          </ul>

          <input
            type="text"
            value={newHotkey}
            onChange={(e) => setNewHotkey(e.target.value)}
            placeholder="Digite a hotkey"
          />
          <button onClick={handleHotkeyAction}>
            {action === 'create' ? 'Criar Hotkey' : action === 'update' ? 'Atualizar Hotkey' : 'Deletar Hotkey'}
          </button>
        </div>
      )}

      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default Profile;
