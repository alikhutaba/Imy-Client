import 'date-fns';

import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import HealingIcon from '@material-ui/icons/Healing';

import CardIcon from "components/Card/CardIcon.js";

import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

// import SnackbarContent from '@material-ui/core/SnackbarContent';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";


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
}));


export default function DiagnosisCard(props) {


    const classes = useStyles();


    return (
        <GridItem xs={12} sm={6} md={12}>

            <Card>
                <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                        <HealingIcon />
                    </CardIcon>
                    < GridContainer >
                        <GridItem xs={12} sm={12} md={11}>
                            <SnackbarContent
                                color="warning"
                                message={"Injection Number " + props.diangnos.diagnosisNumber} />
                        </GridItem>
                    </GridContainer>

                </CardHeader>
                <CardBody>

                    <GridContainer>
                        <GridItem xs={12} sm={12} md={2}>
                            <h3>Allergens</h3>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={8}>
                            <div className={classes.chips}>

                                <Paper component="ul" className={classes.root}>
                                    {props.diangnos.allergens.map((data, i) => {
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
                            <h3>Protocols</h3>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={8}>
                            <div className={classes.chips}>

                                <Paper component="ul" className={classes.root}>
                                    {props.diangnos.protocols.map((data, i) => {
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
                            <h3>Location</h3>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={8}>
                            <div className={classes.chips}>

                                <Paper component="ul" className={classes.root}>
                                    {props.diangnos.injectionLocation.map((data, i) => {
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

                </CardBody>
                <CardFooter stats></CardFooter>
            </Card>
        </GridItem>
    );
}

