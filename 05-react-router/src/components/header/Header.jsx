import React from 'react';
import { Link } from "react-router";

const Header = () => {
  return (
    <nav className='navbar'>
        <div className='container'>
            <Link to="/">Home</Link>
            <Link to="/sobre">Sobre</Link>
            <Link to="/contato">Contato</Link>
            <Link to="/NaoEncontrado">NaoEncontrado</Link>
        </div>
    </nav>
  )
}

export default Header