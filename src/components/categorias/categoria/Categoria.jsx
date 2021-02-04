import React,{useState} from 'react';
import ListaCategorias from './../listaCategorias'
import FormCategoria from './../formCategoria'
import api from './../../../services/api'

export default function Categoria(){
    const [categorias, setaCategorias] = useState([]);

    const addCategoria = categoria => {
        api.post('categorias/', categoria).then(response => {
            const {data} = response;
            setaCategorias(data);
        }).catch(error => {
            console.error(`Ocorreu um erro durante a inserção da categoria: ${error}`);
        });
    };

    const updateCategoria = categoria => {
        api.put('categorias/', categoria).then(response => {
            const {data} = response;
            setaCategorias(data);
        }).catch(error => {
            console.error(`Ocorreu um erro durante a atualização da categoria ${error}`);
        });
    };

    const deleteCategoria = categoriaId => {
        api.delete('categorias/', {data: {"id": categoriaId}}).then(response => {
            const {data} = response;
            setaCategorias(data);
        }).catch(error => {
            console.log(`Ocorreu um erro durante a exclusão da categoria: ${error}`);
        });
    }

    return (
        <>
            <FormCategoria addCategoria={addCategoria} />
            <ListaCategorias categorias={categorias} updateCategoria={updateCategoria} deleteCategoria={deleteCategoria} />
        </>
    );
}