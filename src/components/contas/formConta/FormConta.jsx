import React, {useState, useEffect} from 'react';
import api from './../../../services/api';

export default function FormConta({addConta}) {
    const [nome, setaNome] = useState("");
    const [descricao, setaDescricao] = useState("");
    const [categorias, setaCategoria] = useState([]);

    useEffect(() => {
        api.get('/categorias').then(response => {
            const {data} = response;
            setaCategoria(data);
        }).catch(error => {
            console.error(`Ocorreu um erro ao ler as categorias: ${error}`);
        })
    }, []);

    return (
        <>
            <h1>Registro de conta</h1>
            <form onSubmit={
                (event) => {
                    event.preventDefault();
                    addConta({nome, descricao});
                    setaNome("");
                    setaDescricao("");
                }
            }>
                <input value={nome}
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Digite o nome da conta..."
                    onChange=
                    {(event) => {setaNome(event.target.value)}}/><br/><br/>
                <select name="categorias">
                    {
                    categorias.map((categoria, index) => {
                        return (
                            <option key={index}>
                                {
                                categoria.nome
                            }</option>
                        )
                    })
                } </select><br/><br/>
                <textarea value={descricao}
                    id="descricao"
                    name="descricao"
                    placeholder="Digite a descrição da conta..."
                    rows="10"
                    cols="50"
                    onChange=
                    {(event) => {setaDescricao(event.target.value)}}></textarea><br/><br/>

                <button type="submit">Registrar conta</button>
            </form>
        </>
    );
}
