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
            console.log(data);
        }).catch(err => {
            console.log(`Ocorreu um erro durante a inserção da conta: ${err}`);
        });
    }

    const updateConta = (contaId, novaConta) => {
        setaContas(prev => prev.map(contaAtual => (contaAtual.id === contaId ? novaConta : contaAtual)));
        //console.log('atualizado');
        //console.log(contaId);
        //console.log(novaConta);
    }

    const deleteConta = (contaId) => {
        const removeArr = [...contas].filter(conta => conta.id !== contaId);
        setaContas(removeArr);
    }

    return (
        <>
            <FormConta addConta={addConta} />
            <ListaContas contas={contas} updateConta={updateConta} deleteConta={deleteConta}/>
        </>
    );
}