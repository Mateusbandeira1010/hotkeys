import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './main';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Main />  {/* Certifique-se de que Main está sendo renderizado dentro do Router */}
    </Router>
  </StrictMode>
);
