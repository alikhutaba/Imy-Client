import React from "react";
import { Route, Switch } from 'react-router-dom'
import PatientData from './PatientData'
import PatientsTable from './PatientsTable'


export default function ValidatePatients() {

    return (
        <div>
            <Switch>
                <Route exact path="/admin/ValidatePatients">
                    <PatientsTable></PatientsTable>
                </Route>
                <Route path="/admin/ValidatePatients/PatientData">
                    <PatientData></PatientData>
                </Route>
            </Switch>
        </div >
    );
}
