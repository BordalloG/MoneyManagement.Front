import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Group from './group';
import "./../main/styles.css";

export default class GroupList extends Component {

    componentDidMount() {
        this.props.load();
    }
    finish = this.props.load;

    render() {
        const groups = this.props.groups;
        const soma = groups != null && groups.length > 0 ?
         groups.reduce((i,array) => {
                return {
                    totalValue:i.totalValue + array.totalValue
                }
            })
            :
            0;
            console.log(soma.totalValue);
                
        

        return (
            <div className="group-list">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Titulo</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Valor Acumulado</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <tbody>
                        {groups.map(g => (
                            <Group finished={this.finish} key={g.id} group={g}>
                            </Group>
                        ))}
                    <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Total:</TableCell>
                    <TableCell>
                        {soma.totalValue}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    </TableRow>
                    </tbody>
                </Table>
            </div>
        );
    }

}