
import React, { useEffect } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";


import EditDiagnosisCard from "./EditDiagnosisCard";
import DiagnosisForm from "../NewPatient/DiagnosisForm";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


import { getallAllergensFromServer } from "Controllers/AllergensController";
import { getallProtocolsFromServer } from "Controllers/ProtocolsController";

import { saveAllAllergens, saveAllProtocols } from '../../Redux/actions';
import { useSelector, useDispatch } from "react-redux";

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
    dialogPaper: {
        minHeight: '70vh',
        maxHeight: '80vh',
    },

};

const useStyles = makeStyles(styles);

export default function EditDiagnosis(props) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const diagnosis = useSelector((state) => state.Patient.patientDiagnosis);
    const patient = useSelector((state) => state.Patient.patientData);
    const logedinUser = useSelector((state) => state.StaticData.logedinUser);

    const [newDiagnosisOpen, setNewDiagnosisOpen] = React.useState(false);



    useEffect(() => {
        saveAllergense();
        saveProtocols();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    async function saveAllergense() {
        await getallAllergensFromServer(logedinUser.userId)
            .then(data => {
                dispatch(saveAllAllergens(data));
            }).catch(e => {
                toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
            });
    }

    async function saveProtocols() {
        await getallProtocolsFromServer(logedinUser.userId)
            .then(data => {
                dispatch(saveAllProtocols(data));
            }).catch(e => {
                toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
            });
    }


    function addDiagnosis() {
        setNewDiagnosisOpen(true)
    }

    const handleClose = () => {
        setNewDiagnosisOpen(false);
        if (props.reloadData)
            props.reloadData();
    };



    return (
        <div>
            <GridContainer>

                <Dialog
                    classes={{ paper: classes.dialogPaper }}
                    fullWidth={true}
                    maxWidth="lg"
                    open={newDiagnosisOpen}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <DiagnosisForm patient={patient} diagnosisNumber={diagnosis.length + 1} close={handleClose} save={false} ></DiagnosisForm>
                    </DialogContent>
                </Dialog>


                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color={"primary"}>
                            <CardFooter>
                                <h4 className={classes.cardTitleWhite}>Injections <p className={classes.cardCategoryWhite}>{"Patient Injections"}</p></h4>
                                <Button size="lg" onClick={addDiagnosis} color="info">Add Injection</Button>
                            </CardFooter>
                        </CardHeader>

                        <CardBody>
                            {diagnosis.length <= 0 ? null : diagnosis.map((diangnos, i) =>
                                <EditDiagnosisCard key={i} diangnos={diangnos}></EditDiagnosisCard>

                            )}
                        </CardBody>

                    </Card>
                </GridItem>
            </GridContainer>
        </div >
    );
}
