import 'date-fns';

import React, { useState } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import HealingIcon from '@material-ui/icons/Healing';
import CardIcon from "components/Card/CardIcon.js";
import SelectReact from "react-select";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import { useSelector } from "react-redux";

import EditProtocol from './EditProtocol'

import { sendAllergenProtocolToServer } from "Controllers/AllergenProtocolController";
import { updateDiagnosis } from "Controllers/DiagnosisController";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 320,
        paddingBottom: 15,
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
    },
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: theme.spacing(0.5),
        margin: 0
    },
    chip: {
        margin: theme.spacing(0.5)
    },
    chips: {
        paddingTop: 20,
        paddingBottom: 10,
    },
    select: {
        paddingTop: 10,
    },
    dialogPaper: {
        minHeight: '40vh',
        maxHeight: '80vh',
    },
}));


export default function EditDiagnosisCard(props) {


    const classes = useStyles();

    const allAllergens = useSelector((state) => state.StaticData.allergensDB);
    const allProtocols = useSelector((state) => state.StaticData.protocolsDB);
    const logedinUser = useSelector((state) => state.StaticData.logedinUser);

    const [allergens, setAllergens] = useState(props.diangnos.allergens)
    const [locations, setLocations] = useState(props.diangnos.injectionLocation)

    const [newprotocol, setNewProtocol] = useState()
    const [newDiagnosisOpen, setNewDiagnosisOpen] = React.useState(false);
    const [editMode, setEditMode] = useState(false)


    const handleAllergens = (data) => {
        setAllergens(data.map(allergen => (allergen.value)))
    };

    const handleLocation = (data) => {
        setLocations(data.map(location => (location.value)))
    };


    async function saveDiagnosis() {

        if (editMode) {
            var updatedDiagnosis = props.diangnos;
            updatedDiagnosis.allergens = allergens
            updatedDiagnosis.injectionLocation = locations

            await updateDiagnosis(updatedDiagnosis, logedinUser.userId)
                .then(data => {
                    toast.success("Protocol saved successfuly ", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
                }).catch(e => {
                    toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                });

        }

        setEditMode(!editMode)
    }


    async function saveNewProtocol() {

        if (newprotocol === undefined) {
            toast.error("choose an protocol..!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
            return;
        }

        const newAllergenProtocol = {};
        newAllergenProtocol.protocol = newprotocol;
        newAllergenProtocol.diagnosis = props.diangnos;
        newAllergenProtocol.completed = false;

        await sendAllergenProtocolToServer(newAllergenProtocol, logedinUser.userId)
            .then(data => {
                props.diangnos.protocols.push(data)
                setNewDiagnosisOpen(false);
                toast.success("Diagnosis added successfuly ", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
            }).catch(e => {
                toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
            });
    }

    return (
        <GridContainer>

            <GridItem xs={12} sm={6} md={12}>

                <Card>
                    <CardHeader color={editMode ? "danger" : "warning"} stats icon>

                        <CardIcon color={editMode ? "danger" : "warning"}>
                            <HealingIcon />
                        </CardIcon>
                        < GridContainer >
                            <GridItem xs={12} sm={12} md={11}>
                                <SnackbarContent
                                    color={editMode ? "danger" : "warning"}
                                    message={"Injection Number " + props.diangnos.diagnosisNumber} />
                            </GridItem>
                        </GridContainer>

                    </CardHeader>
                    <CardBody>

                        {/* ------------- ALLERGENS -------------*/}
                        {editMode ?
                            < GridContainer >
                                <GridItem xs={12} sm={12} md={2}>
                                    <h3>Allergens</h3>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={8}>
                                    <div className={classes.select}>
                                        <SelectReact
                                            closeMenuOnSelect={false}
                                            isMulti
                                            defaultValue={allergens.map(allergen => ({ value: allergen, label: allergen.name }))}
                                            options={allAllergens.map(allergen => ({ value: allergen, label: allergen.name }))}
                                            onChange={handleAllergens}
                                        />
                                    </div>
                                </GridItem>
                            </GridContainer>
                            :
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={2}>
                                    <h3>Allergens</h3>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={8}>
                                    <div className={classes.chips}>

                                        <Paper component="ul" className={classes.root}>
                                            {allergens.map((data, i) => {
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
                        }


                        {/* ------------- LOCATION -------------*/}
                        {editMode ?
                            < GridContainer >
                                <GridItem xs={12} sm={12} md={2}>
                                    <h3>Location</h3>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={8}>
                                    <div className={classes.select}>
                                        <SelectReact
                                            closeMenuOnSelect={false}
                                            isMulti
                                            defaultValue={locations.map(location => (Locations.find((L) => { return L.value === location })))}
                                            options={Locations}
                                            onChange={handleLocation}
                                        />
                                    </div>
                                </GridItem>
                            </GridContainer>
                            :
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={2}>
                                    <h3>Location</h3>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={8}>
                                    <div className={classes.chips}>

                                        <Paper component="ul" className={classes.root}>
                                            {locations.map((data, i) => {
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
                        }


                        {/* ------------- PROTOCOL -------------*/}

                        {editMode ?

                            <div>

                                {props.diangnos.protocols === undefined ? null : props.diangnos.protocols.map((protocol, indx) => {
                                    return (
                                        <EditProtocol key={indx} indx={indx} protocol={protocol}></EditProtocol>
                                    );

                                })}
                                <Button id="search" type="button" color="info" size="sm" onClick={() => { setNewDiagnosisOpen(true); }}>{"Add Protocol"}</Button>

                                <Dialog
                                    classes={{ paper: classes.dialogPaper }}
                                    fullWidth={true}
                                    maxWidth="lg"
                                    open={newDiagnosisOpen}
                                    onClose={() => { setNewDiagnosisOpen(false); }}
                                    aria-labelledby="form-dialog-title">
                                    <DialogContent>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <div className={classes.select}>
                                                <SelectReact
                                                    options={allProtocols.map(protocol => ({ value: protocol, label: protocol.name }))}
                                                    onChange={(data) => { setNewProtocol(data.value) }}
                                                />
                                            </div>
                                        </GridItem>
                                        <CardFooter>
                                            <div></div>
                                            <Button id="search" type="button" color="info" size="sm" onClick={saveNewProtocol}>{"Save"}</Button>
                                        </CardFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            :
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={2}>
                                    <h3>Protocols</h3>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={8}>
                                    <div className={classes.chips}>

                                        <Paper component="ul" className={classes.root}>
                                            {props.diangnos.protocols === undefined ? null : props.diangnos.protocols.map((data, i) => {
                                                return (
                                                    <li key={i}>
                                                        <Chip label={data.protocol.name} className={classes.chip} color="primary" />
                                                    </li>
                                                );
                                            })}
                                        </Paper>
                                    </div>

                                </GridItem>
                            </GridContainer>
                        }


                    </CardBody>

                    <CardFooter>
                        <Button id="search" type="button" color="info" size="sm" onClick={saveDiagnosis}>{editMode ? "Save" : "Edit"}</Button>
                        {editMode ?
                            <Button id="search" type="button" color="info" size="sm" onClick={() => { setEditMode(false) }}>{"Exit"}</Button>
                            : null
                        }
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>

    );
}


const Locations = [
    { value: "Left", label: "Left" },
    { value: "LefteUp", label: "Lefte Up" },
    { value: "LeftDown", label: "Left Down" },
    { value: "LeftMiddle", label: "LeftM iddle" },
    { value: "Right", label: "Right" },
    { value: "RightUp", label: "Right Up" },
    { value: "RightDown", label: "Right Down" },
    { value: "RightMiddle", label: "Right Middle" }
];