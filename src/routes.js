import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from "./pages/main/index";
import TransactionMain from "./pages/transactions/index";
const Routes = () => (
<BrowserRouter>
    <Switch>
        <Route exact path= "/" component= {Main}/>
        <Route path="/Group/:id/Transactions" component ={TransactionMain} />
    </Switch>
</BrowserRouter>
);

export default Routes;