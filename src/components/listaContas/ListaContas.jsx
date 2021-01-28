import React, {useState, useEffect} from 'react';
import './ListaContas.css';
import api from './../../services/api';

export default function ListaContas({contas, updateConta, deleteConta}) {
    const [contaEdicao, editarConta] = useState({
        id: null,
        nome: '',
        descricao: '',
        target: '',
        isEditable: false
    });

    const [contasApi, setaContasApi] = useState([]);

    
    useEffect(() => {
        api.get('contas/').then(response => {
            const {data} = response;
            setaContasApi(data);
        }).catch(err => {
            console.error(`Ocorreu um erro ao consultar a api de contas ${err}`);
        });
    },[contas]);
    
    console.log(contasApi);
    
    return (
        <> 
            <table cellSpacing="5" cellPadding="10" border="1">
                <thead>
                    <tr>
                        <th>Nome da conta</th>
                        <th>Descrição</th>
                        <th>Ação</th>
                    </tr>
                </thead>

                <tbody>
                    {contasApi.map((conta, index) => {
                        return (
                            <tr key={index}>
                                <td onClick={() => {editarConta({id: conta.id, alvo:'nome', isEditable:true})}}>
                                    <input 
                                        defaultValue={conta.nome} 
                                        type="text" 
                                        id={`nome${conta.id}`} 
                                        name="nomeEdicao" 
                                        autoFocus={contaEdicao.isEditable} 
                                        readOnly={!contaEdicao.isEditable} 
                                        className= "input-table" 
                                        onClick={(event) => {
                                            event.target.className="input-edit";
                                        }}
                                        onBlur={(event) => {
                                            editarConta({isEditable: false});
                                            event.target.value = conta.nome;
                                            event.target.className="input-table";
                                        }} 
                                        onKeyDown={(event) => {
                                            if(event.key === "Enter"){
                                               updateConta(conta.id, {id: conta.id, nome: event.target.value, descricao: conta.descricao});
                                               editarConta({isEditable: false});
                                               event.target.className="input-table";
                                            }
                                        }}
                                        title="Clique para alterar o conteúdo"
                                    />
                                </td>

                                <td onClick={(event) => {editarConta({id: conta.id, alvo:'descricao', isEditable:true})}}>
                                    <input 
                                        defaultValue={conta.descricao} 
                                        type="text" 
                                        id={`descricao${conta.id}`} 
                                        name="descricaoEdicao" 
                                        autoFocus={contaEdicao.isEditable} 
                                        readOnly={!contaEdicao.isEditable} 
                                        className= "input-table"
                                        onClick={(event) => {
                                            event.target.className="input-edit";
                                        }}
                                        onBlur={(event) => {
                                            editarConta({isEditable: false});
                                            event.target.value = conta.descricao
                                            event.target.className="input-table";
                                        }} 
                                        onKeyDown={(event) => {
                                            if(event.key === "Enter"){
                                                updateConta(conta.id, {id: conta.id, nome: conta.nome, descricao: event.target.value});
                                                editarConta({isEditable: false});
                                                event.target.className="input-table";
                                            }                                                
                                        }}
                                        title="Clique para alterar o conteúdo"
                                    />
                                </td>
                                <td>
                                    <button onClick={() => {
                                        deleteConta(conta.id);
                                    }}>
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}