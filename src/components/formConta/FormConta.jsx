import React, {useState} from 'react';

export default function FormConta({adicionaConta}) {
    const [nome, setaNome] = useState("");
    const [descricao, setaDescricao] = useState("");

    return (
        <>
            <h1>Registro de conta</h1>
            <form onSubmit={
                (event) => {
                    event.preventDefault();
                    adicionaConta({nome, descricao});
                    
                    setaNome("");
                    setaDescricao("");
                }
            }>
                <input value={nome} type="text" id="nome" name="nome" placeholder="Digite o nome da conta..." onChange = {(event) => {setaNome(event.target.value)}} /><br/><br/>
                <textarea value={descricao} id="descricao" name="descricao" placeholder="Digite a descrição da conta..." rows="10" cols="50" onChange = {(event) => {setaDescricao(event.target.value)}}></textarea><br/><br/>

                <button type="submit">Registrar conta</button>
            </form>
        </>
    );
}
