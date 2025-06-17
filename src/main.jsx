import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import SignIn from './Signin.jsx';
import SignUp from './Signup.jsx';  
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<SignIn />} />
        <Route path="auth/signup" element={<SignUp />} />
        <Route path="tasks" element={<App/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
