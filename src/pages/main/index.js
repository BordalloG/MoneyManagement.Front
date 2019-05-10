import React, { Component } from 'react';

import GroupInsert from '../group/groupInsert';
import GroupList from '../group/groupList';
import service from '../../services/transactionGroupService';

export default class Main extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            groups:[]
        }
    }

    loadGroups = () => {
        service.get('/GetAllSimple')
            .then(e => {
                this.setState({ groups: e.data })
            })
            .catch();
    }

    render() {
        return (
            <>
                <GroupInsert load={this.loadGroups} />
                <GroupList load={this.loadGroups} groups={this.state.groups} />
            </>
        );
    }

}

