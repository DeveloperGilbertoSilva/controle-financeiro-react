import React from 'react';

export default function ListaContas({contas}) {
    return (
        <> 
            <table cellSpacing="5" cellPadding="10" border="1">
                <thead>
                    <tr>
                        <th>Nome da conta</th>
                        <th>Descrição</th>
                    </tr>
                </thead>

                <tbody>
                    {contas.map((conta, index) => {
                        return (
                            <tr key={index}>
                                <td>{conta.nome}</td>
                                <td>{conta.descricao}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}