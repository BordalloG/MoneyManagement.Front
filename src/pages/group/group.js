import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';

import service from '../../services/transactionGroupService';

export default class Group extends Component {
    constructor(props) {
        super(props)

        this.state = {
            group: {
                id: props.group.id,
                title: props.group.title,
                description: props.group.description,
                totalValue: props.group.totalValue,
            },
            editingGroup: {
                id: props.group.id,
                title: props.group.title,
                description: props.group.description
            },
            isEditing: false,
        }
    }
    finish = this.props.finished;

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ editingGroup: { ...this.state.editingGroup, [name]: value } });
    }

    ////////Requisições HTTP  /////////////////////////////////////////////////

    salvarEdicao = () => {
        service.put(`/${this.state.editingGroup.id}`, this.state.editingGroup)
            .then(
                e => {
                    const editedGroup = this.state.editingGroup;
                    this.setState({ group: editedGroup });
                    this.changeState();
                }
            )
            .catch(
                e => {
                    console.log(e);
                }
            );
    }

    apagar = () => {
        service.delete(`/${this.state.group.id}`)
            .then(
                e => {
                    this.finish();
                }
            );
    }
    //////////////////////////////////////////////////////////////////////////

    //// Manipulação do editar //////////////////////////////////////////////
    changeState = () => {
        const currentState = this.state.isEditing;
        this.setState({ isEditing: !currentState })
        this.finish();
    }

    cancelar = () => {
        const notEdited = this.state.group;
        this.setState({ editingGroup: notEdited })
        this.changeState();
    }

    //////////////////////////////////////////////////////////////////////////
    render() {

        return (
                <TableRow>
                    <TableCell>
                        {this.props.group.id}
                    </TableCell>
                    <TableCell>
                        {
                            this.state.isEditing ?
                                <TextField value=
                                    {this.state.editingGroup.title}
                                    onChange={this.handleChange}
                                    name="title"
                                />
                                :
                                this.state.group.title
                        }

                    </TableCell>
                    <TableCell>
                        {
                            this.state.isEditing ?
                                <TextField value=
                                    {this.state.editingGroup.description}
                                    onChange={this.handleChange}
                                    name="description" fullWidth
                                />
                                : this.state.group.description
                        }
                    </TableCell>
                    <TableCell>
                        {this.state.group.totalValue}
                    </TableCell>
                    <TableCell>
                        {
                            this.state.isEditing ?
                                <Button onClick={this.salvarEdicao} variant="outlined" color="primary" >
                                    Salvar
                        </Button>
                                : 
                                <Link to={`/Group/${this.state.group.id}/Transactions`} >
                                <Button variant="outlined" color="primary" >
                                    Acessar
                            </Button>
                            </Link>
                        }
                    </TableCell>
                    <TableCell>
                        {
                            this.state.isEditing ?
                                <Button onClick={this.cancelar} variant="outlined" color="inherit" >Cancelar</Button>
                                : <Button onClick={this.changeState} variant="outlined">Editar</Button>

                        }
                    </TableCell>
                    <TableCell>
                        {
                                <Button onClick={this.apagar} variant="outlined" color="secondary" >Apagar</Button>
                        }
                    </TableCell>
                </TableRow>
            )
         
    }
}
