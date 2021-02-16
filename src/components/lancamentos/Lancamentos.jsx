import React, {useEffect, useState} from 'react';
import api from './../../services/api'

export default function Lancamentos() {
    const [lancamentos, setaLancamentos] = useState([]);
    const [contas, setaContas] = useState([]);

    useEffect(() => {
        api.get('/lancamentos').then(response => {
            let {data} = response;
            setaLancamentos(data);

            api.get('/contas').then(response => {
                let {data} = response;
                setaContas(data);
            }).catch(error => {
                console.error(`Erro ao ler Contas ${error}`);
            });
        }).catch(error => {
            console.error(`Erro ao ler Lançamentos ${error}`);
        });
    }, []);

    const nomeConta = contaId => {
        let contaFind = contas.findIndex(conta => conta.id === contaId);
        let conta = contaFind >= 0 ? contas[contaFind] : '';
        return conta.nome;
    };

    return (
        <>
            <h1>Administração de Lançamentos</h1>

            <table cellSpacing="5" cellPadding="10" border="1">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Lançamento</th>
                        <th>Descrição</th>
                        <th>Tipo</th>
                        <th>Conta</th>
                    </tr>
                </thead>

                <tbody> {
                    lancamentos.map((lancamento, index) => {
                        return (
                            <tr key={index}>
                                <td>{
                                    lancamento.data
                                }</td>
                                <td>{
                                    lancamento.nome
                                }</td>
                                <td>{
                                    lancamento.descricao
                                }</td>
                                <td>{
                                    lancamento.tipo
                                }</td>
                                <td>{
                                    nomeConta(lancamento.contaId)
                                }</td>
                            </tr>
                        )
                    })
                } </tbody>
            </table>
        </>
    );
}
