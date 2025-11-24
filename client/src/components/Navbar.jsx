import React, { useState } from 'react';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const logout = () => {
        localStorage.setItem(null);
    }

    return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Menú</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/home">Inicio <span className="sr-only"></span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/expediente">Expediente</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Cerrar Session</a>
                    </li>
                    </ul>
                </div>
            </nav>
        
    );
}

export default Navbar