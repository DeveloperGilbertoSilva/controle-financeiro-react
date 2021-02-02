import React,{useState} from 'react';
import FormConta from '../formConta';
import ListaContas from '../listaContas';
import api from './../../services/api';

export default function Contas() {
    const [contas, setaContas] = useState([]);

    const addConta = (conta) => {
        // let arrayContas = [];
        // arrayContas.push(...contas, conta);
        
        api.post('contas/', conta).then(response => {
            const {data} = response;
            setaContas(data);
            //console.log(data);
        }).catch(err => {
            console.log(`Ocorreu um erro durante a inserção da conta: ${err}`);
        });
    }
    
    const updateConta = (novaConta) => {
        api.put('contas/', novaConta).then(response => {
            const {data} = response;
            setaContas(data);
        }).catch(err => {
            console.log(`Ocorreu um erro durante a atualização da conta: ${err}`);
        });
    }

    const deleteConta = (contaId) => {
        api.delete('contas/', {data: {"id": contaId}}).then(response => {
            const {data} = response;
            setaContas(data);
            //console.log(data);
        }).catch(err => {
            console.log(`Ocorreu um erro durante a exclusão da conta: ${err}`);
        });
    }

    return (
        <>
            <FormConta addConta={addConta} />
            <ListaContas contas={contas} updateConta={updateConta} deleteConta={deleteConta}/>
        </>
    );
}