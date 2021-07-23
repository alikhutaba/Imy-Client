import React, { useState, useRef } from "react";

import { Route } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { useSelector, useDispatch } from "react-redux";
import { addPatientDetails, claerPatient, addPatientDiagnosis } from '../../Redux/actions';

import { GetDiagnosisByPatient } from "Controllers/DiagnosisController";
import { getPatientFromServer } from "Controllers/PatientController";
import { getAllergenProtocolsByDiagnosis } from "Controllers/AllergenProtocolController";

import Injections from './Injections'
import PatientDetails from '../PatientDetails/PatientDetails'
import SessionForm from './SessionForm'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 320,
        paddingTop: 15,
    },
    phoneControl: {
        margin: theme.spacing(1),
        minWidth: 220,
        paddingTop: 22,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
}));

export default function NewSession(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const sessionRef = useRef();

    const [patientId, setPatientId] = useState("")
    const [editMode, setEditMode] = useState(false)

    const patient = useSelector((state) => state.Patient.patientData);
    const savedPatient = useSelector((state) => state.Patient.savedPatient);
    const logedinUser = useSelector((state) => state.StaticData.logedinUser);

    function handlePatientId(e) {
        setPatientId(e.target.value)
    }

    async function getPatientDiagnosis() {
        await GetDiagnosisByPatient(logedinUser.userId, patientId)
            .then(data => {
                getAllergenProtocols(data);
            }).catch(e => {
                toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
            });
    }

    async function getAllergenProtocols(diagnosis) {
        diagnosis.forEach(diagnos => {
            getAllergenProtocolsByDiagnosis(logedinUser.userId, diagnos.diagnosId)
                .then(data => {
                    diagnos.protocols = data;
                }).catch(e => {
                    toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                });
        })
        dispatch(addPatientDiagnosis(diagnosis));
    }

    async function getPatientById() {
        await getPatientFromServer(patientId, logedinUser.userId)
            .then(data => {
                setEditMode(false)
                dispatch(addPatientDetails(data));
                getPatientDiagnosis();
            }).catch(e => {
                toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
            });

    }

    function exitPatientfile() {
        dispatch(claerPatient(PATIENT))
        setPatientId("")
    }


    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>

                        {!savedPatient ? (
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Card>
                                        <CardHeader color={"primary"}>
                                            <h4 className={classes.cardTitleWhite}>Patient</h4>
                                            <p className={classes.cardCategoryWhite}>{"Search Patient By ID"}</p>
                                        </CardHeader>

                                        <CardBody>
                                            <GridContainer>

                                                <GridItem xs={12} sm={12} md={8}>
                                                    <CustomInput
                                                        value={{ value: patientId, setValue: setPatientId }}
                                                        labelText="Enter Patient ID"
                                                        id="patient-id"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            value: patientId,
                                                            onChange: handlePatientId,
                                                            style: { color: '#000000' }
                                                        }}
                                                    />
                                                </GridItem>

                                                <GridItem xs={12} sm={12} md={4}>
                                                    <GridItem>
                                                        <Button id="search" type="button" color="info" size="lg" onClick={getPatientById}>search</Button>
                                                    </GridItem>
                                                </GridItem>

                                            </GridContainer>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            </GridContainer>
                        ) : (null)}

                        <Route path="/admin/NewSession/injections" component={Injections} />

                        {savedPatient ?
                            <div>
                                <PatientDetails patient={patient} editMode={{ editMode, setEditMode }} disableEditMode={false}></PatientDetails>
                                {!editMode ?
                                    <SessionForm ref={sessionRef}></SessionForm>
                                    : null}
                            </div>
                            : null}

                        {savedPatient && !editMode ? (
                            <CardFooter>
                                <Button id="search" type="button" color="info" size="sm" onClick={() => { sessionRef.current.saveSession() }}>continue</Button>
                                <Button id="exit" type="button" color="info" size="sm" onClick={exitPatientfile}>Exit</Button>
                            </CardFooter>
                        ) : null}

                    </Card>
                </GridItem>
            </GridContainer>
        </div >
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
    asthmaRhinitis: "",
    antihistamine: "",
    notes: "",
}