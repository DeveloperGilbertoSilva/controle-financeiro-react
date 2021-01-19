import React, {useState} from 'react';

export default function ListaContas({contas}) {
    const [contaEdicao, editarConta] = useState({
        id: null,
        nome: '',
        descricao: '',
        alvo: ''
    });

    console.log(contaEdicao);
    
    return (
        <> 
            <table cellSpacing="5" cellPadding="10" border="1">
                <thead>
                    <tr>
                        <th>Nome da conta</th>
                        <th>Descrição</th>
                    </tr>
                </thead>

                <tbody>
                    {contas.map((conta, index) => {
                        return (
                            <tr key={index}>
                                {
                                    contaEdicao.id && contaEdicao.id === conta.id ? (
                                        <>
                                            {
                                                contaEdicao.alvo === 'nome' ? (
                                                    <>
                                                        <td>
                                                            <input defaultValue={conta.nome} type="text" name="nomeEdicao" autoFocus onBlur={() => {editarConta({id: null})}} />
                                                        </td>
                                                        <td onClick={() => {editarConta({id: conta.id, alvo:'descricao'})}}>
                                                            <a href="#">{conta.descricao}</a>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td onClick={() => {editarConta({id: conta.id, alvo:'nome'})}}>
                                                            <a href="#">{conta.nome}</a>
                                                        </td>
                                                        <td>
                                                            <input defaultValue={conta.descricao} type="text" name="descricaoEdicao" autoFocus onBlur={() => {editarConta({id: null})}} />
                                                        </td>
                                                    </>
                                                )
                                            }
                                        </>
                                    ):(
                                        <>
                                            <td onClick={() => {editarConta({id: conta.id, alvo:'nome'})}}>
                                                <a href="#">{conta.nome}</a>
                                            </td>
                                            <td onClick={() => {editarConta({id: conta.id, alvo:'descricao'})}}>
                                                <a href="#">{conta.descricao}</a>
                                            </td>
                                        </>
                                    )
                                 
                                }
                                
                                
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}