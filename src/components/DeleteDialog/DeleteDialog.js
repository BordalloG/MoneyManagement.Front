import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


export default class DeleteDialog extends Component {

    state ={
        open:true,
    }

    confirmar = () => { 
        this.props.agree();
        
        this.setState({open:false});
    }
    recusar = () => { 
        if(this.props.disagree)
            this.props.disagree();

        this.setState({open:false});
    }
    render() {
        return (<div>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.content}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.recusar} color="primary">
                        Recusar
                </Button>
                    <Button onClick={this.confirmar} color="primary" autoFocus>
                        Confirmar
                </Button>
                </DialogActions>
            </Dialog>
        </div>

        );
    }
}