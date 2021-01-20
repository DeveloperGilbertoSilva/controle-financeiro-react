import React,{useState} from 'react';
import FormConta from '../formConta';
import ListaContas from '../listaContas';

export default function Contas() {
    const [contas, setaContas] = useState([]);

    const addConta = (conta) => {
        let arrayContas = [];
        arrayContas.push(...contas, conta);
        setaContas(arrayContas);
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