import React, {useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';

export default function Home(){
  // const [form, setForm] = useState({ username: "", password: "" });
  // const navigate = useNavigate();

  // const submit=async e=>{
  //   e.preventDefault();
    
  //   const res = await fetch("http://localhost:3000/api/auth/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(form),
  //   });

  //   const data = await res.json();

  //   if (data.token) {
  //     //AuthProvider.login(data.token);
  //   } else {
  //     navigate("/login");
  //     alert("Credenciales inválidas");
  //   }
  // };

  return (
        <div className='container'>
            <h2>Bienvenido</h2>
          <Navbar/>
        </div>
    );
}
