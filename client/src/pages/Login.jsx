import React, {useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../services/api';

export default function Login(){
  const [form, setForm] = useState({ username: "", passwordHash: "" });
  const navigate = useNavigate();

  const submit=async e=>{
    e.preventDefault();
    
    const res = await api.post('/auth/login', form);
    const data = await res.data;

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      navigate("/home");
    } else {
      navigate("/login");
      alert("Credenciales inválidas");
    }
  };

  return (
   <div style={styles.wrapper}>
      <form style={styles.form} onSubmit={submit}>
        <h2 style={styles.title}>Iniciar Sesión</h2>

        <input
          style={styles.input}
          type="text"
          placeholder="Usuario"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setForm({ ...form, passwordHash: e.target.value })}
          required
        />

        <button style={styles.button}>Ingresar</button>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    background: "#f5f5f5",
  },
  form: {
    width: "100%",
    maxWidth: "350px",
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
  },
  title: { textAlign: "center", marginBottom: "20px" },
  input: {
    width: "100%",
    marginBottom: "15px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#0d6efd",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
