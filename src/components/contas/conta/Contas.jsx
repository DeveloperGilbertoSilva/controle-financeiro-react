import React,{useState} from 'react';
import FormConta from '../formConta';
import ListaContas from '../../contas/listaContas';
import api from '../../../services/api';

export default function Contas() {
    const [contas, setaContas] = useState([]);

    const addConta = conta => {
        // let arrayContas = [];
        // arrayContas.push(...contas, conta);
        
        api.post('contas/', conta).then(response => {
            const {data} = response;
            setaContas(data);
            //console.log(data);
        }).catch(error => {
            console.error(`Ocorreu um erro durante a inserção da conta: ${error}`);
        });
    }
    
    const updateConta = conta => {
        api.put('contas/', conta).then(response => {
            const {data} = response;
            setaContas(data);
        }).catch(err => {
            console.log(`Ocorreu um erro durante a atualização da conta: ${err}`);
        });
    }

    const deleteConta = contaId => {
        api.delete('contas/', {data: {"id": contaId}}).then(response => {
            const {data} = response;
            setaContas(data);
        }).catch(error => {
            console.log(`Ocorreu um erro durante a exclusão da conta: ${error}`);
        });
    }

    return (
        <>
            <FormConta addConta={addConta} />
            <ListaContas contas={contas} updateConta={updateConta} deleteConta={deleteConta}/>
        </>
    );
}