import React, {useState, useEffect} from 'react';
import api from './../../services/api';
import './Dashboard.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const [contaId, setaContaId] = useState("");
    const [tipo, setaTipo] = useState("");
    const [despesa, setaDespesa] = useState("");
    const [descricao, setaDescricao] = useState("");
    const [valor, setaValor] = useState("");
    const [contas, setaContas] = useState([]);
    const [categorias, setaCategorias] = useState([]);

    const addLancamento = lancamento => {
        api.post('/lancamentos', lancamento).then(response => {
            // const {data} = response;
            // setaContas(data);
        }).catch(error => {
            console.error(`Ocorreu um erro durante a inserção do Lançamento: ${error}`);
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        api.get('/contas').then(response => {
            let {data} = response;
            setaContas(data);

            api.get('/categorias').then(response => {
                let {data} = response;
                setaCategorias(data);
            }).catch(erro => {
                console.log(`Erro ao ler as categorias: ${erro}`);
            });
        }).catch(erro => {
            console.error(`Erro ao ler as contas: ${erro}`);
        });
    }, []);

    const nomeCategoria = categoriaId => {
        let categoriaFind = categorias.findIndex(categoria => categoria.id === categoriaId);
        let categoria = categoriaFind >= 0 ? categorias[categoriaFind] : '';
        return categoria.nome;
    };


    return (
        <>
            <h1>Dashboard</h1>
            <table cellSpacing="5" cellPadding="10" border="1">
                <thead>
                    <tr>
                        <th>Conta</th>
                        <th>Categoria</th>
                        <th>Saldo</th>
                        <th>Ação</th>
                    </tr>
                </thead>

                <tbody> {
                    contas.map((conta, index) => {
                        return (
                            <tr key={index}>
                                <td className="nome-conta">
                                    {
                                    conta.nome
                                }</td>
                                <td>{
                                    nomeCategoria(conta.categoriaId)
                                }</td>
                                <td>R$ {
                                    conta.id
                                }</td>
                                <td>
                                    <div>
                                        <Button variant="outlined" color="primary"
                                            onClick={() => {
                                                    setaContaId(conta.id);
                                                    setaTipo("receita");
                                                    handleClickOpen();
                                                }
                                        }>
                                            Receita
                                        </Button>
                                        <Dialog open={open}
                                            onClose={handleClose}
                                            aria-labelledby="form-dialog-title">
                                            <DialogTitle id="form-dialog-title">Adicionar Receita</DialogTitle>
                                            <DialogContent>

                                                <TextField autoFocus margin="dense" id="despesa" label="Despesa" type="text" onChange= {event => setaDespesa(event.target.value)} fullWidth/>
                                                <TextField autoFocus margin="dense" id="descricao" label="Descrição" type="text" onChange= {event => setaDescricao(event.target.value)} fullWidth/>
                                                <TextField autoFocus margin="dense" id="valor" label="Valor" type="number" onChange= {event => setaValor(event.target.value)} fullWidth/>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}
                                                    color="primary">
                                                    Cancelar
                                                </Button>
                                                <Button onClick={
                                                        () => {
                                                            addLancamento({
                                                                nome: despesa,
                                                                descricao,
                                                                tipo,
                                                                valor,
                                                                contaId
                                                            });
                                                            handleClose();
                                                        }
                                                    }
                                                    color="primary">
                                                    Registrar
                                                </Button>
                                            </DialogActions>
                                        </Dialog>

                                        &nbsp;

                                        <Button variant="outlined" color="primary"
                                            onClick={
                                                event => {
                                                    setaContaId(conta.id);
                                                    setaTipo("despesa");
                                                    handleClickOpen();
                                                }
                                        }>
                                            Despesa
                                        </Button>
                                        <Dialog open={open}
                                            onClose={handleClose}
                                            aria-labelledby="form-dialog-title">
                                            <DialogTitle id="form-dialog-title">Adicionar Despesa</DialogTitle>
                                            <DialogContent>

                                                <TextField autoFocus margin="dense" id="despesa" label="Despesa" type="text" onChange= {event => setaDespesa(event.target.value)} fullWidth/>
                                                <TextField autoFocus margin="dense" id="descricao" label="Descrição" type="text" onChange= {event => setaDescricao(event.target.value)} fullWidth/>
                                                <TextField autoFocus margin="dense" id="valor" label="Valor" type="number" onChange= {event => setaValor(event.target.value)} fullWidth/>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}
                                                    color="primary">
                                                    Cancelar
                                                </Button>
                                                <Button onClick={
                                                        event => {
                                                            addLancamento({
                                                                nome: despesa,
                                                                descricao,
                                                                tipo,
                                                                valor,
                                                                contaId
                                                            });
                                                            handleClose();
                                                        }
                                                    }
                                                    color="primary">
                                                    Registrar
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                </td>
                            </tr>
                        );
                    })
                } </tbody>
            </table>
        </>


    );
}
