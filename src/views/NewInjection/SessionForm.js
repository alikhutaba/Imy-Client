import React, { useState, forwardRef, useImperativeHandle } from "react";
import { useHistory } from "react-router-dom";

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from "@material-ui/core/InputLabel";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { addPatientSession } from '../../Redux/actions';
import { useSelector, useDispatch } from "react-redux";

import { validateSession } from "Validators/Validator";
import { sendSessionToServer } from "Controllers/SessionController";



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


const SessionForm = forwardRef((props, ref) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [antihistamineBeforeVaccinationAnswer, setAntihistamineBeforeVaccinationAnswer] = useState('');
    const [antihistamineBeforeVaccination, setAntihistamineBeforeVaccination] = useState('');
    const [howThePreviousInjectionWentAnswer, setHowThePreviousInjectionWentAnswer] = useState('');
    const [howThePreviousInjectionWent, setHowThePreviousInjectionWent] = useState('');
    const [howYouFeelTodayAnswer, setHowYouFeelTodayAnswer] = useState('');
    const [howYouFeelToday, setHowYouFeelToday] = useState('');

    const patient = useSelector((state) => state.Patient.patientData);
    const logedinUser = useSelector((state) => state.StaticData.logedinUser);


    useImperativeHandle(
        ref,
        () => ({
            saveSession() {
                addSession();
            }
        }),
    )

    const handleAntihistamineBeforeVaccinationAnswer = (event) => {
        setAntihistamineBeforeVaccinationAnswer(event.target.value);
        if (event.target.value === "false")
            setAntihistamineBeforeVaccination("");
    };
    const handleAntihistamineBeforeVaccination = (event) => {
        setAntihistamineBeforeVaccination(event.target.value);
    };

    const handleHowThePreviousInjectionWentAsnwer = (event) => {
        setHowThePreviousInjectionWentAnswer(event.target.value);
        if (event.target.value === "false")
            setHowThePreviousInjectionWent("");
    };
    const handleHowThePreviousInjectionWent = (event) => {
        setHowThePreviousInjectionWent(event.target.value);
    };

    const handleHowYouFeelTodayAnswer = (event) => {
        setHowYouFeelTodayAnswer(event.target.value);
        if (event.target.value === "true")
            setHowYouFeelToday("");
    }
    const handleHowYouFeelToday = (event) => {
        setHowYouFeelToday(event.target.value);
    };



    async function addSession() {

        var session = {
            sessionId: "",
            createdBy: logedinUser,
            patient: patient,
            signUpTimestamp: "",
            howYouFeelToday: {
                answer: howYouFeelTodayAnswer,
                notes: howYouFeelToday
            },
            howThePreviousInjectionWent: {
                answer: howThePreviousInjectionWentAnswer,
                notes: howThePreviousInjectionWent
            },
            antihistamineBeforeVaccination: {
                answer: patient.antihistamine === "yes" ? antihistamineBeforeVaccinationAnswer : "not Relevant",
                notes: patient.antihistamine === "yes" ? antihistamineBeforeVaccination : "not Relevant",
            }

        }

        var valid = await validateSession(session);
        if (valid) {
            await sendSessionToServer(session)
                .then(data => {
                    dispatch(addPatientSession(data));
                    history.replace('/admin/NewInjection/injections');
                }).catch(e => {
                    toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                });
        }
    }



    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color={"warning"}>
                        <h4 className={classes.cardTitleWhite}>Session Contraindications</h4>
                        <p className={classes.cardCategoryWhite}>{"fill the form to continue"}</p>
                    </CardHeader>
                    <CardBody>

                        {patient.antihistamine === "yes" ?
                            <div>

                                <GridContainer style={{ direction: "rtl", justifyContent: "flex-end", textAlign: "left" }}>
                                    {antihistamineBeforeVaccinationAnswer === "false" ?
                                        <GridItem xs={12} sm={12} md={7}>
                                            <CustomInput
                                                labelText="הערות"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    value: antihistamineBeforeVaccination,
                                                    onChange: handleAntihistamineBeforeVaccination,
                                                    disabled: false,
                                                    style: { color: '#FF4500' }
                                                }}
                                            />
                                        </GridItem>
                                        : null
                                    }

                                    <GridItem xs={12} sm={12} md={3}>
                                        <InputLabel>האם לקח.ה אנטיהיסטמין?</InputLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={2}>
                                        <RadioGroup aria-label="quiz" name="quiz" value={antihistamineBeforeVaccinationAnswer} onChange={handleAntihistamineBeforeVaccinationAnswer}>
                                            <FormControlLabel value='true' control={<Radio />} label="כן" />
                                            <FormControlLabel value="false" control={<Radio />} label="לא" />
                                        </RadioGroup>
                                    </GridItem>

                                </GridContainer>
                                <br></br>
                                <hr></hr>
                                <br></br>
                            </div>
                            : null}



                        <GridContainer style={{ direction: "rtl", justifyContent: "flex-end", textAlign: "left" }}>
                            {howThePreviousInjectionWentAnswer === "false" ?
                                <GridItem xs={12} sm={12} md={7}>
                                    <CustomInput
                                        labelText="הערות"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: howThePreviousInjectionWent,
                                            onChange: handleHowThePreviousInjectionWent,
                                            disabled: false,
                                            style: { color: '#FF4500' }
                                        }}
                                    />
                                </GridItem>
                                : null
                            }
                            <GridItem xs={12} sm={12} md={3}>
                                <InputLabel>האם חיסון קודם עבר היטב?</InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={2}>
                                <RadioGroup aria-label="quiz" name="quiz" value={howThePreviousInjectionWentAnswer} onChange={handleHowThePreviousInjectionWentAsnwer}>
                                    <FormControlLabel value='true' control={<Radio />} label="כן" />
                                    <FormControlLabel value="false" control={<Radio />} label="לא" />
                                </RadioGroup>
                            </GridItem>
                        </GridContainer>

                        <br></br>
                        <hr></hr>
                        <br></br>

                        <GridContainer style={{ direction: "rtl", justifyContent: "flex-end", textAlign: "left" }}>
                            {howYouFeelTodayAnswer === "false" ?
                                <GridItem xs={12} sm={12} md={7}>
                                    <CustomInput
                                        labelText="הערות"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: howYouFeelToday,
                                            onChange: handleHowYouFeelToday,
                                            disabled: false,
                                            style: { color: '#FF4500' }
                                        }}
                                    />
                                </GridItem>
                                : null}
                            <GridItem xs={12} sm={12} md={3}>
                                <InputLabel>האם מרגיש.ה היום טוב?</InputLabel>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={2}>
                                <RadioGroup aria-label="quiz" name="quiz" value={howYouFeelTodayAnswer} onChange={handleHowYouFeelTodayAnswer}>
                                    <FormControlLabel value='true' control={<Radio />} label="כן" />
                                    <FormControlLabel value="false" control={<Radio />} label="לא" />
                                </RadioGroup>
                            </GridItem>
                        </GridContainer>

                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer >
    );
})



export default SessionForm;