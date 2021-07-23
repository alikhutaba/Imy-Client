import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import { claerPatient } from '../../Redux/actions';
import { useSelector, useDispatch } from "react-redux";

import InjectionTab from "./InjectionTab";
import PatientDetails from '../PatientDetails/PatientDetails'


export default function Injections(props) {

    const dispatch = useDispatch();
    const history = useHistory();

    const patient = useSelector((state) => state.Patient.patientData);
    const patientDiagnosis = useSelector((state) => state.Patient.patientDiagnosis);
    const [editMode, setEditMode] = useState(false)


    function exitPatientfile() {
        dispatch(claerPatient(PATIENT))
        history.replace('/admin/NewInjection');
    }



    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <PatientDetails patient={patient} editMode={{ editMode, setEditMode }} disableEditMode={true}></PatientDetails>

                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomTabs
                                title="Injections:"
                                headerColor="primary"
                                tabs={

                                    patientDiagnosis.map((diangnos, i) => {

                                        return {
                                            tabName: "Injection " + (diangnos.diagnosisNumber),
                                            tabContent: (<InjectionTab diagnosis={diangnos}></InjectionTab>),
                                        }
                                    })
                                }

                            />
                        </GridItem>
                    </GridContainer>

                    <CardFooter>
                        <div></div>
                        <Button id="exit" type="button" color="info" size="sm" onClick={exitPatientfile}>Exit</Button>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>

    );
}



var PATIENT = {
    patientId: "",
    fisrtName: "",
    lastName: "",
    middleName: "",
    birthdate: {
        days: "1",
        months: "1",
        years: "1900",
    },
    gender: "",
    phone1: "",
    address: {
        state: "",
        city: "",
        streetAddress: "",
        houseNumber: "",
    },
    added_by: {},
    validated_by: {},
    hmo: "",
    vaccineStatus: "",
    medicationSensitivity: {
        answer: "",
        notes: "",

    },
    nursingHistory: "",
    notes: "",
}


