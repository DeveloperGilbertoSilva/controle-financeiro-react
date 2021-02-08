import React, {useState, useEffect} from 'react';
import './../../Lista.css';
import api from './../../../services/api';

export default function ListaContas({contas, updateConta, deleteConta}) {
    const [contaEdicao, editarConta] = useState({
        id: null,
        nome: '',
        descricao: '',
        target: '',
        isEditable: false
    });

    const [contasApi, setaContasApi] = useState([]);
    const [categorias, setaCategorias] = useState([]);

    useEffect(() => {
        api.get('/contas').then(response => {
            setaContasApi(response.data);
            api.get('/categorias').then(response => {
                setaCategorias(response.data);
            }).catch(error => {
                console.log(`Erro ao ler as categorias: ${error}`);
            });
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
            }
        }
    }, [contasApi]);

    
    const nomeCategoria = conta => {
        let categoriaFound = categorias.find(categoria => categoria.id === conta.categoriaId);
        let index = categorias.indexOf(categoriaFound);
        return index >= 0 ? categorias[index].nome : '';
    };
    
    //console.log(categorias);

    return (
        <> 
            <table cellSpacing="5" cellPadding="10" border="1">
                <thead>
                    <tr>
                        <th>Nome da conta</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
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
                                    <textarea
                                        name={`descricao-${conta.id}`}
                                        defaultValue={conta.descricao}
                                        cols="100"
                                        rows="10"
                                        className="input-table textarea-descricao"
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
                                    ></textarea>
                                </td>
                               
                                <td>{nomeCategoria(conta)}</td>
                               
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