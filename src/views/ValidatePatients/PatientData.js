import React, { useState, useEffect } from "react";

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardFooter from "components/Card/CardFooter.js";

import { useSelector, useDispatch } from "react-redux";
import { addPatientDetails, claerPatient, addPatientDiagnosis } from '../../Redux/actions';

import { GetDiagnosisByPatient } from "Controllers/DiagnosisController";
import { getPatientFromServer, validPatient } from "Controllers/PatientController";
import { getAllergenProtocolsByDiagnosis } from "Controllers/AllergenProtocolController";

import PatientDetails from '../PatientDetails/PatientDetails'
import EditDiagnosis from '../EditPatient/EditDiagnosis'


export default function PatientData(props) {

    const dispatch = useDispatch();

    const patientId = props.patientId;
    const [editMode, setEditMode] = useState(false)
    const [dataReady, setDataReady] = useState(false)

    const patient = useSelector((state) => state.Patient.patientData);
    const savedPatient = useSelector((state) => state.Patient.savedPatient);
    const logedinUser = useSelector((state) => state.StaticData.logedinUser);


    useEffect(() => {
        getPatientById();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps




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
        });
        dispatch(addPatientDiagnosis(diagnosis));
        setDataReady(true)
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
        props.refreshTable();
    }

    async function validatePatient() {

        await validPatient(logedinUser.userId, patient)
            .then(data => {
                toast.success("Patient validated successfuly ", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
                dispatch(claerPatient(PATIENT))
                props.refreshTable();
            }).catch(e => {
                toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
            });

    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>

                        {savedPatient ?
                            <div>
                                <PatientDetails patient={patient} editMode={{ editMode, setEditMode }} disableEditMode={false}></PatientDetails>
                                {!editMode && dataReady ?
                                    <EditDiagnosis></EditDiagnosis>
                                    : null}
                            </div>
                            : null}

                        {savedPatient && !editMode ? (
                            <CardFooter>
                                <Button id="search" type="button" color="info" size="sm" onClick={validatePatient}>Validate</Button>
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
    nursingHistory: "",
    notes: "",
}