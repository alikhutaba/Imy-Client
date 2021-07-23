import React from "react";
import { Route, Switch } from 'react-router-dom'
import Newsecssion from './NewSession'
import Injections from './Injections'

export default function newInjection() {
    return (
        <div>
            <Switch>
                <Route exact path="/admin/NewInjection">
                    <Newsecssion></Newsecssion>
                </Route>
                <Route path="/admin/NewInjection/injections">
                    <Injections></Injections>
                </Route>
            </Switch>
        </div >
    );
}