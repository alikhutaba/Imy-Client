import React, { useState } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from "components/Table/Table.js";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { useSelector } from "react-redux";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";


import { calculateInjections, sendInjectionsToServer, getInjectionByAllergenProtocol } from "Controllers/InjectionsController";

import ShowProtocol from './ShowProtocol'

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


export default function InjectionTab(props) {

    const classes = useStyles();

    const diangnos = props.diagnosis
    const patientSession = useSelector((state) => state.Patient.patientSession);
    const logedinUser = useSelector((state) => state.StaticData.logedinUser);

    const [edit, setEdit] = useState(false)
    const [showInjection, setShowInjection] = useState(false)
    const [showProtocol, setShowProtocol] = React.useState(false);

    const [protocol, setProtocol] = useState()
    // const [injection, setInjection] = useState()

    const [doseNumber, setDoseNumber] = useState(0)
    const [concentration, setConcentration] = useState(0)
    const [dosage, setDosage] = useState(0)
    const [injectionNotes, setInjectionNotes] = useState("")
    const [inectionLocation, setInectionLocation] = useState("")
    const [doctorInstruction, setDoctorInstruction] = useState(false)

    const [injections, setInjections] = useState([])

    function handleDoseNumber(e) {
        setDoseNumber(e.target.value)
        setConcentration(protocol.protocol.concentration[e.target.value])
        setDosage(protocol.protocol.dosage[e.target.value])
    }

    function handleConcentration(e) {
        setConcentration(e.target.value)
    }

    function handleDosage(e) {
        setDosage(e.target.value)
    }

    const handleProtocol = (event) => {
        setProtocol(event.target.value);
        if (event.target.value != null)
            getInjectionByProtocol(event.target.value);
    }

    const handleLocation = (event) => {
        setInectionLocation(event.target.value);
    };

    function handleInjectionNotes(e) {
        setInjectionNotes(e.target.value)
    }


    async function getInjectionByProtocol(allergenProtocols) {
        await getInjectionByAllergenProtocol(logedinUser.userId, allergenProtocols.allergenProtocolsId)
            .then(data => {
                setInjections(data)
            }).catch(e => {
                toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
            });
    }


    function exitInjection() {
        setShowInjection(false);
        setDoseNumber(0)
        setConcentration(0)
        setDosage(0)
        setInjectionNotes("")
        setInectionLocation("")
    }



    async function saveInjection() {

        var injection = {
            injectionId: "",
            signUpTimestamp: new Date(),
            injectionLocation: inectionLocation,
            notes: injectionNotes,
            allergenProtocols: protocol,
            session: patientSession,
            createdBy: logedinUser,
            doseNumber: doseNumber,
            concentration: concentration,
            dosage: dosage,
            DoctorInstruction: false
        }

        if (inectionLocation === "") {
            toast.error("Choose inection location", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
            return;
        }

        await sendInjectionsToServer(injection, logedinUser.userId)
            .then(data => {
                toast.success("Injection saved successfuly ", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
                exitInjection();
                getInjectionByProtocol(protocol);
            }).catch(e => {
                toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
            });
    }


    function newInjection() {

        if (protocol === undefined)
            toast.error("Choose a protocol", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        else {

            calInjection();
            setShowInjection(true);
        }

    }


    async function calInjection() {

        var injection = {
            injectionId: "",
            signUpTimestamp: new Date(),
            injectionLocation: diangnos.injectionLocation[0],
            notes: "",
            allergenProtocols: protocol,
            session: patientSession,
            createdBy: logedinUser,
            doseNumber: "",
            concentration: "",
            dosage: "",
            DoctorInstruction: ""
        }

        await calculateInjections(injection, logedinUser.userId)
            .then(data => {
                // setInjection(data);
                setDoctorInstruction(data.doctorInstruction);
                setDoseNumber(data.doseNumber)
                setConcentration(data.concentration)
                setDosage(data.dosage)
            }).catch(e => {
                toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
            });
    }


    function handleshowProtocol() {
        if (protocol === undefined)
            toast.error("choose a protocol", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        else
            setShowProtocol(true)
    }


    function timeFormat(time) {
        return time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear() + " - " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    }

    return (
        <Card>
            <CardBody>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>

                        <GridContainer>
                            <GridItem xs={12} sm={12} md={2}>
                                <h5>Allergens</h5>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={10}>
                                <div className={classes.chips}>

                                    <Paper component="ul" className={classes.root}>
                                        {diangnos.allergens.map((data, i) => {
                                            return (
                                                <li key={i}>
                                                    <Chip label={data.name} className={classes.chip} color="primary" />
                                                </li>
                                            );
                                        })}
                                    </Paper>
                                </div>
                            </GridItem>
                        </GridContainer>

                        <GridContainer>
                            <GridItem xs={12} sm={12} md={2}>
                                <h5>Location</h5>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={10}>
                                <div className={classes.chips}>

                                    <Paper component="ul" className={classes.root}>
                                        {diangnos.injectionLocation.map((data, i) => {
                                            return (
                                                <li key={i}>
                                                    <Chip label={data} className={classes.chip} color="primary" />
                                                </li>
                                            );
                                        })}
                                    </Paper>
                                </div>
                            </GridItem>
                        </GridContainer>
                    </GridItem>




                    <GridItem xs={12} sm={12} md={6}>

                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="vaccineStatus">Protocols</InputLabel>
                                    <Select
                                        labelId="Protocols"
                                        value={protocol}
                                        onChange={handleProtocol}
                                    >
                                        {diangnos.protocols !== undefined ? diangnos.protocols.map((data) => {
                                            return (
                                                <MenuItem value={data}>{data.protocol.name}</MenuItem>
                                            );
                                        }) : null}
                                    </Select>
                                </FormControl>
                            </GridItem>

                            <GridItem xs={12} sm={12} md={5}>
                                <Button onClick={handleshowProtocol} id="search" type="button" color="info" block >Show Protocol</Button>


                                {protocol !== undefined ?

                                    < Dialog
                                        fullWidth={true}
                                        maxWidth="lg"
                                        open={showProtocol}
                                        onClose={() => { setShowProtocol(false) }}
                                        aria-labelledby="form-dialog-title">
                                        <DialogContent>
                                            <ShowProtocol protocol={protocol.protocol}></ShowProtocol>
                                        </DialogContent>
                                    </Dialog>
                                    : null}
                            </GridItem>

                        </GridContainer>

                        <GridContainer>

                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Completed"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: protocol === undefined ? "" : protocol.completed ? "Yes" : !protocol.completed ? "No" : "",
                                        disabled: true,
                                        style: { color: '#000000' }
                                    }}
                                />
                            </GridItem>

                            < GridItem xs={12} sm={12} md={5}>
                                {protocol === undefined ? null : protocol.completed ? null : !protocol.completed ?
                                    < Button id="search" type="button" color="danger" block onClick={newInjection}>Add Injection</Button>
                                    : null}
                            </GridItem>


                        </GridContainer>


                    </GridItem>
                </GridContainer>




                {showInjection ?
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={2}>

                                        <CardHeader color={!edit ? "rose" : "danger"}>
                                            <h5 className={classes.cardTitleWhite}>New Injection</h5>
                                        </CardHeader>

                                    </GridItem>

                                </GridContainer>


                                <CardBody>

                                    {doctorInstruction ?
                                        < GridContainer >
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel error={true}
                                                    inputProps={{
                                                        disabled: true,
                                                        style: { color: '#FF4500' }
                                                    }}>Can't calculate dosage without Doctor Instruction</InputLabel>
                                            </GridItem>
                                        </GridContainer>
                                        : null}

                                    {edit ?
                                        < GridContainer >
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel error={true}
                                                    inputProps={{
                                                        disabled: true,
                                                        style: { color: '#FF4500' }
                                                    }}>need to set the dose number of the next injection from the protocol</InputLabel>
                                            </GridItem>
                                        </GridContainer>
                                        : null}


                                    < GridContainer >

                                        <GridItem xs={12} sm={12} md={3}>

                                            <FormControl className={classes.formControl} disabled={!edit}>
                                                <InputLabel id="dosenumber">dose number</InputLabel>
                                                <Select
                                                    labelId="dosenumber"
                                                    value={doseNumber}
                                                    onChange={handleDoseNumber}
                                                >
                                                    {protocol !== undefined ? protocol.protocol.dosage.map((data, i) => {
                                                        return (
                                                            <MenuItem value={i}>{i}</MenuItem>
                                                        );
                                                    }) : null}
                                                </Select>
                                            </FormControl>
                                        </GridItem>


                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="concentration"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    value: concentration,
                                                    onChange: handleConcentration,
                                                    disabled: !edit,
                                                    style: { color: '#000000' }
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="dosage"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    value: dosage,
                                                    onChange: handleDosage,
                                                    disabled: !edit,
                                                    style: { color: '#000000' }
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <Button color="primary" onClick={() => { setEdit(!edit) }}>{edit ? "save changes" : "edit"}</Button>
                                        </GridItem>
                                    </GridContainer>

                                    < GridContainer >
                                        <GridItem xs={12} sm={12} md={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="injectionLocation">Injection Location</InputLabel>
                                                <Select
                                                    labelId="injectionLocation"
                                                    value={inectionLocation}
                                                    onChange={handleLocation}
                                                    disabled={edit}
                                                >
                                                    {diangnos.injectionLocation !== undefined ? diangnos.injectionLocation.map((data) => {
                                                        return (
                                                            <MenuItem value={data}>{data}</MenuItem>
                                                        );
                                                    }) : null}
                                                </Select>
                                            </FormControl>
                                        </GridItem>


                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Notes"

                                                value={{ value: injectionNotes, setValue: setInjectionNotes }}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    multiline: true,
                                                    rows: 1,
                                                    disabled: edit,
                                                    value: injectionNotes,
                                                    onChange: handleInjectionNotes
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>

                                <CardFooter>
                                    {!edit ? (
                                        <Button id="search" type="button" color="info" size="sm" onClick={saveInjection}>Save</Button>
                                    ) : (
                                        null
                                    )
                                    }

                                    {!edit ? (
                                        <Button id="exit" type="button" color="info" size="sm" onClick={exitInjection}>cancle</Button>
                                    ) : (
                                        null
                                    )
                                    }

                                </CardFooter>
                            </Card>
                        </GridItem>
                    </GridContainer>
                    : null}


                <GridContainer>
                    <Table
                        id="Injections"
                        tableHeaderColor="primary"
                        tableHead={["Dose Number", "Dosage", "Concentration", "Time", "Location", "Signature", "Notes"]}
                        clickable={false}

                        tableData={
                            injections.map((injection, i) =>
                                [injection.doseNumber, injection.dosage, injection.concentration, timeFormat(new Date(injection.signUpTimestamp)), injection.injectionLocation, injection.createdBy.fisrtName + " " + injection.createdBy.lastName, injection.notes]
                            )
                        }
                    />
                </GridContainer>

            </CardBody >
        </Card >

    );
}




