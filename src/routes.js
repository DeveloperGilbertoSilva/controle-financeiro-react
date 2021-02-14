import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './components/dashboard';
import Contas from './pages/AdmContas';
import Categorias from './pages/AdmCategorias';
import Lancamentos from './pages/AdmLancamentos';

export default function MainRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/contas" element={<Contas />}/>
            <Route path="/categorias" element={<Categorias />}/>
            <Route path="/lancamentos" element={<Lancamentos />}/>
        </Routes>
    );
}