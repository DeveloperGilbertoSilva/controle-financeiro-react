import React,{useState} from 'react';
import FormConta from '../formConta';
import ListaContas from '../listaContas';

export default function Contas() {
    const [contas, setaContas] = useState([]);
    const adicionaConta = (conta) => {
        let arrayContas = [];
        arrayContas.push(...contas, conta);
        setaContas(arrayContas);
    }
    
    return (
        <>
            <FormConta adicionaConta={adicionaConta} />
            <ListaContas contas={contas} />
        </>
    );
}