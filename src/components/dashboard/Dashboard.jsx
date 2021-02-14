import React, {useState, useEffect} from 'react';
import api from './../../services/api';
import './Dashboard.css';

export default function Dashboard(){
    const [contas, setaContas] = useState([]);
    const [categorias, setaCategorias] = useState([]);

    useEffect(() => {
        api.get('/contas').then(response => {
            let {data} = response;
            setaContas(data);

            api.get('/categorias').then(response => {
                let {data} = response;
                setaCategorias(data);
            }).catch(erro => {
                console.log(`Erro ao ler as categorias: ${erro}`);
            });
        }).catch(erro => {
            console.error(`Erro ao ler as contas: ${erro}`);
        });
    }, []);

    const nomeCategoria = categoriaId => {
        let categoriaFind = categorias.findIndex(categoria => categoria.id === categoriaId);
        let categoria = categoriaFind >= 0 ? categorias[categoriaFind] : '';
        return categoria.nome;
    };


    return (
        <>
            <h1>Dashboard</h1>
            <table cellSpacing="5" cellPadding="10" border="1">
                <thead>
                    <tr>
                        <th>Conta</th>
                        <th>Categoria</th>
                        <th>Saldo</th>
                        <th>Ação</th>
                    </tr>
                </thead>

                <tbody>
                    {contas.map((conta, index) => {
                        return (
                            <tr key={index}>
                                <td className="nome-conta">{conta.nome}</td>
                                <td>{nomeCategoria(conta.categoriaId)}</td>
                                <td>R$</td>
                                <td>
                                    <button>Receita</button> &nbsp;&nbsp;
                                    <button>Despesa</button>
                                </td>
                            </tr>    
                        );
                    })}
                </tbody>
            </table>
        </>

        
    );
}