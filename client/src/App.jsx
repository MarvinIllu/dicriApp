import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import ExpedientesList from './pages/ExpedientesList';
import ExpedienteForm from './pages/ExpedienteForm';
import IndicioView from './pages/IndicioView';
import Home from './pages/Home';
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);

  const login = () =>
    setUser({
      id: 1,
      name: "John",
      permissions: ["analize"],
      roles: ["admin"],
    });
  const logout = () => setUser(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/expediente" element={<ExpedientesList />} />
        <Route path="/expediente/form" element={<ExpedienteForm />} />
        <Route path="/expediente/form/:expedienteId" element={<ExpedienteForm />} />
        <Route path="/indicio/form/:expedienteId" element={<IndicioView />} />
      </Routes>
    </BrowserRouter>
  );
}

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Landing</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
}

export default App;