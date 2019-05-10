import React from 'react';
import "./styles.css";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const Header = () => (
    <AppBar position="static" color="primary">
        <Toolbar>
            <a href="/">
                Money Management
            </a>
        </Toolbar>
    </AppBar>
);


export default Header;