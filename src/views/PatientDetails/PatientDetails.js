import React, { useRef } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import DetailsShort from './DetailsShort'
import DetailsLong from './DetailsLong'



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



export default function PatientDetails(props) {
    const classes = useStyles();

    const DetailsLongRef = useRef();

    const { editMode, setEditMode } = props.editMode;
    const disableEditMode = props.disableEditMode || false;



    function changeMode() {
        if (editMode)
            DetailsLongRef.current.savePatient()
        setEditMode(!editMode)
    }

    function CancleEditMode() {
        setEditMode(!editMode)
    }


    return (
        <GridContainer>

            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color={editMode ? "danger" : "primary"}>
                        <CardFooter>
                            <h4 className={classes.cardTitleWhite}>Patient <p className={classes.cardCategoryWhite}>{"Details"}</p></h4>

                            {!disableEditMode ?
                                <div>
                                    <Button id="exit" type="button" color="info" size="sm" onClick={changeMode}>{editMode ? "Save" : "Edit"}</Button>
                                    <span></span>
                                    {editMode ?
                                        <Button id="exit" type="button" color="info" size="sm" onClick={CancleEditMode}>Cancle</Button>
                                        : null}
                                </div>
                                : null}
                        </CardFooter>
                    </CardHeader>

                    {editMode !== undefined && editMode && !disableEditMode ?
                        <DetailsLong ref={DetailsLongRef} patient={props.patient}></DetailsLong>
                        :
                        <DetailsShort patient={props.patient}></DetailsShort>
                    }

                </Card>
            </GridItem>
        </GridContainer>
    );
}

