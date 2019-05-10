import React, { Component } from 'react';

import transactionService from "../../services/transactionsService"

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteDialog from './../../components/DeleteDialog/DeleteDialog';

export default class Transaction extends Component {

    state = {
        transaction: this.props.transaction,
        editingTransaction: this.props.transaction,
        isEditing: false,
        isDeleting: false,
    }

    handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;
        this.setState({ editingTransaction: { ...this.state.editingTransaction, [name]: value } });
    }


    finish = this.props.finished;

    abrirModalApagar = () => {
        this.setState({ isDeleting: true });
    }
    apagar = () => {
        transactionService.delete("" + this.state.transaction.id)
            .then(
                r => {
                    this.finish();
                }
            )
            .catch(r => {
                console.log(r);
            })
    }

    cancelar = () => {
        const notEdited = this.state.transaction;
        this.setState({ editingTransaction: notEdited })
        this.toggle();
    }
    cancelarExclusao = () => {
        this.setState({ isDeleting: false })
    }

    editar = () => {
        transactionService.put("" + this.state.transaction.id, this.state.editingTransaction)
            .then(r => {
                console.log(r);
                const edited = this.state.editingTransaction;
                this.setState({ transaction: edited });
                this.toggle();
                this.finish();
            }
            )
            .catch(e => {
                console.log(e);
            })
    }

    toggle = () => { this.setState({ isEditing: !this.state.isEditing }); }

    render() {
        return (
            <>
                <TableRow>
                    <TableCell>
                        {this.state.transaction.id}
                    </TableCell>
                    <TableCell>
                        {
                            this.state.isEditing
                                ?
                                <Tooltip title={this.state.editingTransaction.title}>
                                    <TextField type="text" onChange={this.handleChange} name="title" value={this.state.editingTransaction.title} placeholder="Título:" autoComplete="off" />
                                </Tooltip>
                                :
                                this.state.transaction.title}
                    </TableCell>
                    <TableCell>
                        {
                            this.state.isEditing
                                ?
                                <Tooltip title={this.state.editingTransaction.description}>
                                    <TextField type="text" onChange={this.handleChange} name="description" value={this.state.editingTransaction.description} placeholder="Descrição" autoComplete="off" />
                                </Tooltip>
                                :
                                this.state.transaction.description ? this.state.transaction.description : "..."
                        }
                    </TableCell>
                    <TableCell>
                        {
                            this.state.isEditing
                                ?
                                <TextField type="text" onChange={this.handleChange} name="value" value={this.state.editingTransaction.value} placeholder="Valor" autoComplete="off" />
                                :
                                this.state.transaction.value
                        }
                    </TableCell>
                    <TableCell>
                        {
                            this.state.isEditing ?
                                <TextField type="text" onChange={this.handleChange} name="transactionDate" value={this.state.editingTransaction.transactionDate.toLocaleString()} placeholder="Data" autoComplete="off" />
                                :
                                new Date(this.state.transaction.transactionDate).toLocaleString()
                        }
                    </TableCell>

                    <TableCell>
                        {
                            this.state.isEditing ?
                                <Tooltip title="Salvar">
                                    <IconButton onClick={this.editar} variant="outlined" color="default" >
                                        <SaveIcon />
                                    </IconButton>
                                </Tooltip>
                                :
                                <Tooltip title="Editar">
                                    <IconButton onClick={this.toggle} variant="outlined" color="primary" >
                                        <CreateIcon />
                                    </IconButton>
                                </Tooltip>
                        }
                        {
                            this.state.isEditing ?
                                <Tooltip title="Cancelar">
                                    <IconButton onClick={this.cancelar} color="primary">
                                        <ClearIcon />
                                    </IconButton>
                                </Tooltip>
                                :
                                <Tooltip title="Excluir">
                                    <IconButton onClick={this.abrirModalApagar} aria-label="Delete" color="secondary" >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                        }

                    </TableCell>
                </TableRow>
                {
                    this.state.isDeleting ?
                        <DeleteDialog title={"Tem certeza que deseja deletar a transação ?"}
                            content={"Ao clicar em concordar a ação não pode ser desfeita."}
                            agree={this.apagar} disagree={this.cancelarExclusao}
                        />
                        : null
                }

            </>
        );
    }
}
