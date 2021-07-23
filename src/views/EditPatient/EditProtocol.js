import 'date-fns';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import SelectReact from "react-select";

import { useSelector } from "react-redux";
import { updateAllergenProtocol } from "Controllers/AllergenProtocolController";


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
    }
}));


export default function EditProtocol(props) {


    const classes = useStyles();

    const allProtocols = useSelector((state) => state.StaticData.protocolsDB);
    const logedinUser = useSelector((state) => state.StaticData.logedinUser);

    const [protocol, setProtocol] = useState(props.protocol.protocol)
    const [editMode, setEditMode] = useState(false)
    const [completed, setCompleted] = useState(props.protocol.completed)



    const handleProtocol = (data) => {
        setProtocol(data.value)
        setCompleted("false");
        var allergenProtocol = props.protocol;
        allergenProtocol.protocol = data.value;
        allergenProtocol.completed = "false";
        save(allergenProtocol);
    };


    const handleCompleted = (event) => {
        setCompleted(event.target.value);
        var allergenProtocol = props.protocol;
        allergenProtocol.protocol = protocol;
        allergenProtocol.completed = event.target.value;
        save(allergenProtocol);
    }

    async function save(allergenProtocol) {

        await updateAllergenProtocol(allergenProtocol, logedinUser.userId)
            .then(data => {
                toast.success("Protocol saved successfuly ", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
            }).catch(e => {
                toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
            });

    }


    useEffect(() => {
        if (props.protocol.completed === true)
            setEditMode(true)
    }, []);// eslint-disable-line react-hooks/exhaustive-deps


    return (

        <GridContainer>
            < GridItem xs={12} sm={12} md={2} >
                <h3>Protocol {props.indx + 1}</h3>
            </GridItem >
            <GridItem xs={12} sm={12} md={4}>

                <div className={classes.select}>
                    <SelectReact
                        defaultValue={{ value: protocol, label: protocol.name }}
                        isDisabled={editMode}
                        options={allProtocols.map(protocol => ({ value: protocol, label: protocol.name }))}
                        onChange={handleProtocol}
                    />
                </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
                <FormControl className={classes.formControl} disabled={editMode}>
                    <InputLabel id="Completed">Completed</InputLabel>
                    <Select
                        labelId="Completed"
                        value={completed}
                        onChange={handleCompleted}
                    >
                        <MenuItem value={"true"}>Yes</MenuItem>
                        <MenuItem value={"false"}>No</MenuItem>
                    </Select>
                </FormControl>
            </GridItem>

        </GridContainer >
    );
}

