import React, { useEffect, useState } from "react";

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "components/Table/Table.js";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { useSelector } from "react-redux";

import { getUnvalidPatients } from "Controllers/PatientController";
import PatientData from "./PatientData"


const useStyles = makeStyles((theme) => ({
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
    },
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
    chip: {
        margin: theme.spacing(0.5)
    },
    chips: {
        paddingTop: 20,
        paddingBottom: 10,
    },
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: theme.spacing(0.5),
        margin: 0
    },
}));


export default function PatientsTable(props) {

    const classes = useStyles();

    const [patients, setPatients] = useState([])
    const [showTable, setShowTable] = useState(true)
    const [page, setPage] = useState(0);
    const [patientId, setPatientId] = useState();
    const logedinUser = useSelector((state) => state.StaticData.logedinUser);

    useEffect(() => {
        getUnvalidPatientFromServer(0, 10);
    }, []);// eslint-disable-line react-hooks/exhaustive-deps


    async function getUnvalidPatientFromServer(page, size) {

        await getUnvalidPatients(logedinUser.userId, page, size)
            .then(data => {
                setPatients(data)
            }).catch(e => {
                toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
            });
    }

    function handleChangePage(event, newPage) {
        setPage(newPage);
        getUnvalidPatientFromServer(newPage, 10);
    }

    function validatePatient(indx) {
        setPatientId(patients[indx].patientId)
        setShowTable(false)
    }

    function refreshTable() {
        getUnvalidPatientFromServer(page, 10);
        setShowTable(true)
    }



    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color={"warning"}>
                            <h4 className={classes.cardTitleWhite}>Unvalid patients</h4>
                        </CardHeader>
                        <CardBody>

                            {showTable ?
                                <GridContainer>

                                    <Table
                                        id="Injections"
                                        tableHeaderColor="primary"
                                        tableHead={["#", "ID", "Name", "Gender", "Hmo", "Phone", "Added by", "Validate"]}
                                        clickable={true}
                                        page={page}
                                        handleChangePage={handleChangePage}
                                        onClickButton={validatePatient}
                                        buttonName={"Check patient"}
                                        tableData={
                                            patients.map((patient, i) =>
                                                [(i + 1) + (page * 10) + "", patient.patientId, patient.fisrtName + " " + patient.lastName, patient.gender, patient.hmo, patient.phone1, patient.added_by.fisrtName + " " + patient.added_by.lastName]
                                            )
                                        }
                                    />
                                </GridContainer>
                                :
                                null
                            }

                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>

            {!showTable ?
                <PatientData patientId={patientId} showTable={[showTable, setShowTable]} refreshTable={refreshTable}></PatientData>
                :
                null
            }

        </div>
    );
}




