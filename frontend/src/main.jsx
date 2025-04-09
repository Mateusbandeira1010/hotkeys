import { Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './pages/login/login';  
import Register from './pages/register/register';
import Perfil from './pages/perfil/perfil';  
import Home from './pages/home/home';
import Download from './pages/downloads/download';
import Hotkey from './pages/hotkeys/hotkey';
import Discord from './pages/discord/discord';


function Main() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/hotkey" element={<Hotkey />} />
        <Route path="/download" element={<Download />} />
        <Route path="/cad" element={<Register />} />
        <Route path="/perfil" element={<Perfil />} /> 
        <Route path="/discord" element={<Discord />} />
      </Route>
    </Routes>
  );
}

export default Main;
