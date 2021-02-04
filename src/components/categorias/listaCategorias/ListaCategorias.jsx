import React,{useState, useEffect} from 'react';
import './../../Lista.css';
import api from './../../../services/api'

export default function ListaCategorias({categorias, updateCategoria, deleteCategoria}) {
    const [categoriaEdicao, editarCategoria] = useState({
        id: null,
        nome: '',
        descricao: '',
        target: '',
        isEditable: false
    });

    const [categoriasApi, setaCategoriasApi] = useState([]);
    
    useEffect(() => {
        api.get('/categorias').then(response => {
            setaCategoriasApi(response.data);
        }).catch(error => {
            console.error(`Erro ao ler categorias ${error}`);
        });
    }, [categorias])
    

    useEffect(() => {
        if (categoriasApi) {
            for(var i = 0; i < categoriasApi.length; i++ ){
                var nome = document.getElementsByName(`nome-${categoriasApi[i].id}`);
                var descricao = document.getElementsByName(`descricao-${categoriasApi[i].id}`);
                nome[0].value = categoriasApi[i].nome;  
                descricao[0].value = categoriasApi[i].descricao;  
            }
        }
    }, [categoriasApi]);
    

    return(
        <table cellSpacing="5" cellPadding="10" border="1">
            <thead>
                <tr>
                    <th>Nome da categoria</th>
                    <th>Descrição</th>
                    <th>Ação</th>
                </tr>
            </thead>

            <tbody>
                {categoriasApi.map((categoria, index) => {
                    return(
                        <tr key={index}>
                            <td onClick={() => {editarCategoria({id: categoria.id, target:'nome', isEditable:true})}}>
                                <input 
                                    type="text"
                                    name={`nome-${categoria.id}`}
                                    defaultValue={categoria.nome}
                                    className="input-table"
                                    readOnly={!categoriaEdicao.isEditable} 
                                    onClick={(event) => {
                                        event.target.className="input-edit";
                                    }}
                                    onBlur={(event) => {
                                        editarCategoria({isEditable: false});
                                        event.target.value = categoria.nome;
                                        event.target.className="input-table";
                                    }} 
                                    onKeyDown={(event) => {
                                        if(event.key === "Enter"){
                                            updateCategoria({id: categoria.id, nome: event.target.value, descricao: categoria.descricao});
                                            editarCategoria({isEditable: false});
                                            event.target.className="input-table";
                                        }
                                    }}
                                    title="Clique para alterar o conteúdo"
                                    placeholder={categoria.nome}
                                /> 
                            </td>
                            
                            <td onClick={() => {editarCategoria({id: categoria.id, target:'descricao', isEditable:true})}}>
                                <textarea
                                    name={`descricao-${categoria.id}`}
                                    defaultValue={categoria.descricao}
                                    cols="100"
                                    rows="10"
                                    className="input-table textarea-descricao"
                                    readOnly={!categoriaEdicao.isEditable} 
                                    onClick={(event) => {
                                        event.target.className="input-edit";
                                    }}
                                    onBlur={(event) => {
                                        editarCategoria({isEditable: false});
                                        event.target.value = categoria.descricao;
                                        event.target.className="input-table";
                                    }} 
                                    onKeyDown={(event) => {
                                        if(event.key === "Enter"){
                                        updateCategoria({id: categoria.id, nome: categoria.name, descricao: event.target.value});
                                        editarCategoria({isEditable: false});
                                        event.target.className="input-table";
                                        }
                                    }}
                                    title="Clique para alterar o conteúdo"
                                    placeholder={categoria.descricao}
                                ></textarea>
                            </td>
                            
                            <td>
                                <button onClick={() => {
                                    deleteCategoria(categoria.id);
                                }}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}