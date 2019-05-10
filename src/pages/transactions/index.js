import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import transactionsService from '../../services/transactionsService';
import groupService from '../../services/transactionGroupService';
import TransactionList from './transactionList';

export default class TransactionMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            transactions: [],
            group: {
                id: this.props.match.params.id,
                title: '',
                description: '',
            },
        }
    }

    load = () => {
        transactionsService.get(`Group/${this.props.match.params.id}/GetAll`)
            .then(r => {
                this.setState({ transactions: r.data })
            })
            .catch(e => {
                console.log(e);
            });
        groupService.get(`${this.props.match.params.id}`)
            .then(r => {
                this.setState({ group: r.data });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const group = this.state.group;
        const transaction = this.state.transactions;
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <TransactionList transactions={transaction} group={group} load={this.load} />
                </Grid>
            </Grid>
        );
    }
}