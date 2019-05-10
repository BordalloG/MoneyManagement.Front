import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import service from '../../services/transactionGroupService';
import "../main/styles.css";

export default class GroupInsert extends Component {

    state = {
        group: {
            title: "",
            description: "",
        },
    }
    
    finish = this.props.load;

    submit = (event) => {
        event.preventDefault();

        service.post('', this.state.group)
            .then(() => {
                this.setState({ group: { title: "", description: "" } });
                this.finish();
            })
            .catch((error) => {
                console.log(error)
            });
    }
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ group: { ...this.state.group, [name]: value } });
    }

    render() {

        const title = this.state.group.title;
        const description = this.state.group.description;

        return (
            <Grid container spacing={0}>
                <Grid item xs={4}></Grid>
                    <Grid item xs={1} >
                        <TextField type="text" onChange={this.handleChange} name="title" value={title} placeholder="Título" autoComplete="off" />
                    </Grid>
                    <Grid item xs={1} >
                        <TextField type="text" onChange={this.handleChange} name="description" value={description} placeholder="Descrição" autoComplete="off" />
                    </Grid>
                    <Grid item xs={1} >
                        <Button onClick={this.submit} variant="contained" color="primary" > Adicionar </Button>
                    </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        );
    }
}