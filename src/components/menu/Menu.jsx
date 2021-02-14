import React from 'react';
import {Link} from 'react-router-dom';
import './Menu.css';

export default function Menu(){
    return(
        <header>
            <h1>Bussola Money</h1>

            <nav className="menu-header">
                <Link to="/">Painel principal</Link>
                <Link to="/lancamentos">Lançamentos</Link>
                <Link to="/contas">Contas</Link>
                <Link to="/categorias">Categorias</Link>
            </nav>
        </header>
    );
}