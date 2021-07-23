import 'date-fns';

import React, { useState } from "react";
import SelectReact from "react-select";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { addDiagnosis, addDiagnosisNumber } from '../../Redux/actions';
import { useSelector, useDispatch } from "react-redux";

import { sendDiagnosisToServer } from "Controllers/DiagnosisController";
import { sendAllergenProtocolToServer } from "Controllers/AllergenProtocolController";

const styles = {
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
    chip: {
        paddingTop: 20,
        paddingBottom: 10,
    },


};

const useStyles = makeStyles(styles);

export default function DaignosisDetails(props) {

    const classes = useStyles();
    const dispatch = useDispatch();

    require('dotenv').config()
    toast.configure()

    const patient = props.patient;
    const diagnosisNumber = props.diagnosisNumber;

    const allAllergens = useSelector((state) => state.StaticData.allergensDB);
    const allProtocols = useSelector((state) => state.StaticData.protocolsDB);
    const logedinUser = useSelector((state) => state.StaticData.logedinUser);

    const [allergens, setAllergens] = useState([])
    const [protocol, setProtocol] = useState({})
    const [locations, setLocations] = useState([])

    const handleAllergens = (data) => {
        setAllergens(data.map(allergen => (allergen.value)))
    };

    const handleProtocol = (data) => {
        setProtocol(data.value)
    };

    const handleLocation = (data) => {
        setLocations(data.map(location => (location.value)))
    };

    async function validateDiagnosis() {

        if (allergens.length === 0) {
            toast.error("Choose an allergens ", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
            return false;
        }

        if (Object.keys(protocol).length === 0 && protocol.constructor === Object) {
            toast.error("Choose an protocol ", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
            return false;
        }

        if (locations.length === 0) {
            toast.error("Choose an location ", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
            return false;
        }

        return true;
    }

    async function saveDiagnosis() {
        var validDiagnosis = await validateDiagnosis();

        if (validDiagnosis) {

            const newDiagnosis = {};
            newDiagnosis.diagnosisNumber = diagnosisNumber;
            newDiagnosis.injectionLocation = locations;
            newDiagnosis.patient = patient;
            newDiagnosis.allergens = allergens;

            await sendDiagnosisToServer(newDiagnosis, logedinUser.userId)
                .then(data => {
                    saveAllergenProtocol(data)
                }).catch(e => {
                    toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                });
        }
    }

    async function saveAllergenProtocol(diagnosis) {

        const newAllergenProtocol = {};
        newAllergenProtocol.protocol = protocol;
        newAllergenProtocol.diagnosis = diagnosis;
        newAllergenProtocol.completed = false;

        await sendAllergenProtocolToServer(newAllergenProtocol, logedinUser.userId)
            .then(data => {
                diagnosis.protocols = [data.protocol]
                if (props.save) {
                    dispatch(addDiagnosis(diagnosis));
                    dispatch(addDiagnosisNumber(diagnosisNumber));
                }
                props.close();
            }).catch(e => {
                toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
            });
    }


    return (

        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color={"primary"}>
                        <h3 className={classes.cardTitleWhite}>New Injection</h3>
                        <h5 className={classes.cardCategoryWhite}>{"Injection number "}{diagnosisNumber}</h5>
                    </CardHeader>

                    <CardBody>

                        {/* ------------- ALLERGENS -------------*/}
                        < GridContainer >
                            <GridItem xs={12} sm={12} md={2}>
                                <h3>Allergens</h3>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8}>
                                <div className={classes.chip}>
                                    <SelectReact
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={allAllergens.map(allergen => ({ value: allergen, label: allergen.name }))}
                                        onChange={handleAllergens}
                                    />
                                </div>
                            </GridItem>
                        </GridContainer>

                        {/* ------------- PROTOCOL -------------*/}
                        < GridContainer >
                            <GridItem xs={12} sm={12} md={2}>
                                <h3>Protocol</h3>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8}>
                                <div className={classes.chip}>
                                    <SelectReact
                                        // closeMenuOnSelect={false}
                                        // isMulti
                                        options={allProtocols.map(protocol => ({ value: protocol, label: protocol.name }))}
                                        onChange={handleProtocol}
                                    />
                                </div>
                            </GridItem>
                        </GridContainer>


                        {/* ------------- LOCATION -------------*/}
                        < GridContainer >
                            <GridItem xs={12} sm={12} md={2}>
                                <h3>Location</h3>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8}>
                                <div className={classes.chip}>
                                    <SelectReact
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={Locations}
                                        onChange={handleLocation}
                                    />
                                </div>
                            </GridItem>
                        </GridContainer>
                    </CardBody>

                    <CardFooter>
                        <Button onClick={saveDiagnosis} color="primary">Save</Button>
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