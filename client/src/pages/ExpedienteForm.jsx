import React, {useState, useEffect} from 'react';
import api from '../services/api';
import { useNavigate, useParams  } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';


export default function ExpedienteForm(){
  const [numero, setNumero] = useState('');
  const [justificacionRechazo, setJustificacionRechazo] = useState('');
  const navigate = useNavigate();  
  const [isVisible, setIsVisible] = useState(false);

  let { expedienteId } = useParams();

  useEffect(() => {
    if(expedienteId > 0){
      setIsVisible(true);
    }
  }, [expedienteId]);

  const submit = async e=>{
    e.preventDefault();
    try{
      const token = localStorage.getItem('token');
      if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await api.post('/expediente/expedientes', { numero_expediente: numero, justificacion_rechazo : justificacionRechazo, estado: "INGRESO", tecnico_id: 5 });
      navigate('/expediente');
    }catch(err){
      console.error(err);
      alert('Error');
    }
  };

  return (
    <div className='container'>
      <Navbar/>
      <h2>Crear Expediente</h2>

      <form onSubmit={submit}>
          <label className="form-label">Número expediente</label>
          <div><input className="form-control" value={numero} onChange={e=>setNumero(e.target.value)} placeholder="Número expediente" required /></div>

           {isVisible && (
            <div>
              <label className="form-label">Justificación Rechazo</label>
              <div><input className="form-control" value={justificacionRechazo} onChange={e=>setJustificacionRechazo(e.target.value)} placeholder="Justificación Rechazo" /></div>
            </div>
           )}
        <button className="btn btn-primary">Crear</button>
        <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#exampleModal">
        <Link to={`/expediente`} > Regresar </Link>
      </button>
      </form>
    </div>
  );
}
