import React, {useState} from 'react';

export default function FormCategoria({addCategoria}) {
    const [nome, setaNome] = useState("");
    const [descricao, setaDescricao] = useState("");

    return (
        <>
            <h1>Registro de categoria</h1>
            <form onSubmit={
                (event) => {
                    event.preventDefault();
                    addCategoria({nome, descricao});
                    setaNome("");
                    setaDescricao("");
                }
            }>
                <input value={nome}
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Digite o nome da categoria..."
                    onChange=
                    {(event) => {setaNome(event.target.value)}}/><br/><br/>
                <textarea value={descricao}
                    id="descricao"
                    name="descricao"
                    placeholder="Digite a descrição da categoria..."
                    rows="10"
                    cols="50"
                    onChange=
                    {(event) => {setaDescricao(event.target.value)}}></textarea><br/><br/>

                <button type="submit">Registrar categoria</button>
            </form>
        </>
    );
}
