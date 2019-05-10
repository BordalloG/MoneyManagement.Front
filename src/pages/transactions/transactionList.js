import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';

import Transaction from './transaction';
import transactionService from '../../services/transactionsService';
import "./transactionList.css";

export default class TransactionList extends Component {
    state = {
        dialogIsOpen: false,
        newTransaction: {
            groupId: this.props.group.id,
            title: "",
            description: "",
            value: 0,
            transactionDate: new Date(),
        }
    }
    componentDidMount() {
        this.props.load();
    }

    load = () => {
        this.props.load();
    }

    openDialog = () => {
        this.setState({ dialogIsOpen: true });
    }

    closeDialog = () => {
        this.setState({ dialogIsOpen: false });
    }

    InsertNew = () => {
        this.openDialog();
        transactionService.post("", this.state.newTransaction)
            .then(r => {
                this.setState({
                    newTransaction: {
                        groupId: this.props.group.id,
                        title: " ",
                        description: " ",
                        value: 0,
                        transactionDate: new Date()
                    }
                });
                this.closeDialog();
                this.load();
            })
            .catch(
                e => { console.log(e); }
            );
    }
    cancelar = () => {
        this.setState({
            newTransaction: {
                groupId: this.props.group.id,
                title: "",
                description: "",
                value: 0,
                transactionDate: new Date()
            }
        });

        this.closeDialog();
    }

    handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;
        this.setState({ newTransaction: { ...this.state.newTransaction, [name]: value } });
    }

    render() {

        const transactions = this.props.transactions ? this.props.transactions : null;

        return (
            <>
            <div className="GroupDescription">
                <h1>
                    {this.props.group.title}
                </h1>
                <p>
                     {this.props.group.description} 
                </p>
            </div>
            
                <Paper className="transaction">
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Titulo</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Valor</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell>
                                    <Tooltip title="Adicionar novo">
                                        <Fab size="small" color="primary" onClick={this.openDialog}>
                                            <AddIcon />
                                        </Fab>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <tbody>
                            {transactions ? transactions.map(t => (
                                <Transaction id={t.id} transaction={t} finished={this.load} />
                            )) : null
                            }

                        </tbody>
                    </Table>

                    {transactions ? null :
                        <p>Nenhum resultado encontrado.</p>
                    }
                </Paper>


                {/* Modal para adicionar*/}


                <Dialog
                    open={this.state.dialogIsOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Inserir nova Transação:"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                            <TextField type="text" onChange={this.handleChange}
                                name="title" value={this.state.newTransaction.title}
                                placeholder="Pizza" autoComplete="off" label="Título" />

                            <TextField type="text" onChange={this.handleChange}
                                name="description" value={this.state.newTransaction.description}
                                placeholder="Pizza com os amigos" autoComplete="off" label="Descrição" />

                            <TextField type="text" onChange={this.handleChange}
                                name="value" value={this.state.newTransaction.value}
                                placeholder="0,00" autoComplete="off" label="Valor"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                }} />
                            <TextField type="datetime-local"
                                onChange={this.handleChange} name="transactionDate"
                                value={this.state.newTransaction.transactionDate.toLocaleString()}
                                placeholder="Data" autoComplete="off" label="Data"
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={this.InsertNew} color="primary" autoFocus>
                            Salvar
                        </Button>

                        <Button onClick={this.cancelar} color="default"  >
                            Cancelar
                        </Button>

                    </DialogActions>
                </Dialog>

            </>
        );
    }
}
