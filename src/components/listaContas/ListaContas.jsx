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
        api.get('/contas').then(response => {
            setaContasApi(response.data);
        }).catch(error => {
            console.error(`Erro ao ler contas: ${error}`);
        });
    }, [contas]);

    useEffect(() => {
        if (contasApi) {
            for(var i = 0; i < contasApi.length; i++ ){
                var nome = document.getElementsByName(`nome-${contasApi[i].id}`);
                var descricao = document.getElementsByName(`descricao-${contasApi[i].id}`);
                nome[0].value = contasApi[i].nome;  
                descricao[0].value = contasApi[i].descricao;  
                //console.log(elemento[0].value);          
            }
        }
    }, [contasApi]);
    
    

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
                                <td onClick={() => {editarConta({id: conta.id, target:'nome', isEditable:true})}}>
                                    <input 
                                        type="text"
                                        name={`nome-${conta.id}`}
                                        defaultValue={conta.nome}
                                        className="input-table"
                                        readOnly={!contaEdicao.isEditable} 
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
                                            updateConta({id: conta.id, nome: event.target.value, descricao: conta.descricao});
                                            editarConta({isEditable: false});
                                            event.target.className="input-table";
                                            }
                                        }}
                                        title="Clique para alterar o conteúdo"
                                        placeholder={conta.nome}
                                    /> 
                                </td>

                                <td onClick={() => {editarConta({id: conta.id, target:'descricao', isEditable:true})}}>
                                    <input 
                                        type="text"
                                        name={`descricao-${conta.id}`}
                                        defaultValue={conta.descricao}
                                        className="input-table"
                                        readOnly={!contaEdicao.isEditable} 
                                        onClick={(event) => {
                                            event.target.className="input-edit";
                                        }}
                                        onBlur={(event) => {
                                            editarConta({isEditable: false});
                                            event.target.value = conta.descricao;
                                            event.target.className="input-table";
                                        }} 
                                        onKeyDown={(event) => {
                                            if(event.key === "Enter"){
                                            updateConta({id: conta.id, nome: conta.name, descricao: event.target.value});
                                            editarConta({isEditable: false});
                                            event.target.className="input-table";
                                            }
                                        }}
                                        title="Clique para alterar o conteúdo"
                                        placeholder={conta.descricao}
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