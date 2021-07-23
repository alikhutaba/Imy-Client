import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import DateFnsUtils from '@date-io/date-fns';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MuiPhoneNumber from 'material-ui-phone-number';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardBody from "components/Card/CardBody.js";

import { validatePatient } from "Validators/Validator";
import { updatePatientInServer } from "Controllers/PatientController";
import { addPatientDetails } from '../../Redux/actions';
import { useDispatch, useSelector } from "react-redux";



import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';




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


const DetailsLong = forwardRef((props, ref) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const logedinUser = useSelector((state) => state.StaticData.logedinUser);

    var patient = props.patient;
    const [savedPatient, setSavedPatient] = useState(false)

    const [patientId, setPatientId] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [birthdate, setBirthdate] = useState();
    const [gender, setGender] = useState("")
    const [phone, setPhone] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [streetAddress, setStreetAddress] = useState("")
    const [houseNumber, setHouseNumber] = useState()
    const [hmo, setHmo] = useState("")
    const [vaccineStatus, setVaccineStatus] = useState("")
    const [medicationSensitivityAnswer, setMedicationSensitivityAnswer] = useState(false)
    const [medicationSensitivityNote, setMedicationSensitivityNote] = useState("")
    const [asthmaRhinitis, setAsthmaRhinitis] = useState("")
    const [antihistamine, setAntihistamine] = useState("")
    const [notes, setNotes] = useState("")

    // private UserBoundary added_by;
    // private UserBoundary validated_by;

    const handleMedicationSensitivityAnswer = (event) => {
        setMedicationSensitivityAnswer(event.target.value);
        if (event.target.value === "false")
            setMedicationSensitivityNote("")
    }


    useEffect(() => {
        showPatientData(props.patient)
    }, []);// eslint-disable-line react-hooks/exhaustive-deps


    useImperativeHandle(
        ref,
        () => ({
            savePatient() {
                updatePatient();
            }
        }),
    )


    function showPatientData(patinetData) {

        setPatientId(patinetData.patientId)
        setFirstName(patinetData.fisrtName)
        setMiddleName(patinetData.middleName)
        setLastName(patinetData.lastName)
        setGender(patinetData.gender)
        setPhone(patinetData.phone1)
        setState(patinetData.address.state)
        setCity(patinetData.address.city)
        setStreetAddress(patinetData.address.streetAddress)
        setHouseNumber(patinetData.address.houseNumber)
        setHmo(patinetData.hmo)
        setVaccineStatus(patinetData.vaccineStatus)
        setMedicationSensitivityAnswer(patinetData.medicationSensitivity.answer)
        setMedicationSensitivityNote(patinetData.medicationSensitivity.notes)
        setAsthmaRhinitis(patinetData.asthmaRhinitis)
        setAntihistamine(patinetData.antihistamine)
        setNotes(patinetData.notes)
        setBirthdate(new Date(patinetData.birthdate.years, patinetData.birthdate.months - 1, patinetData.birthdate.days));
        setSavedPatient(true)
    }



    async function updatePatient() {

        let newPatient = JSON.parse(JSON.stringify(patient));

        newPatient.fisrtName = firstName;
        newPatient.lastName = lastName;
        newPatient.middleName = middleName;
        if (birthdate !== undefined && birthdate !== '') {
            newPatient.birthdate.days = birthdate.getDate();
            newPatient.birthdate.months = birthdate.getMonth() + 1;
            newPatient.birthdate.years = birthdate.getFullYear();
        }
        newPatient.gender = gender;
        newPatient.phone1 = phone;
        newPatient.address.state = state;
        newPatient.address.city = city;
        newPatient.address.streetAddress = streetAddress;
        newPatient.address.houseNumber = houseNumber;
        newPatient.hmo = hmo;
        newPatient.added_by = logedinUser;
        // private UserBoundary added_by;
        // private UserBoundary validated_by;
        newPatient.vaccineStatus = vaccineStatus;
        newPatient.medicationSensitivity = {};
        newPatient.medicationSensitivity.answer = medicationSensitivityAnswer;
        newPatient.medicationSensitivity.notes = medicationSensitivityNote;

        newPatient.asthmaRhinitis = asthmaRhinitis;
        newPatient.antihistamine = antihistamine;
        newPatient.notes = notes;

        var valid = await validatePatient(newPatient);
        if (valid) {
            await updatePatientInServer(newPatient, logedinUser.userId)
                .then(data => {
                    patient = newPatient;
                    dispatch(addPatientDetails(newPatient));
                }).catch(e => {
                    toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                });
        }
    }




    return (

        <CardBody>
            { savedPatient ?
                < div >
                    {/* ------------- ID -------------*/}
                    < GridContainer >
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Patient ID"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: patientId,
                                    onChange: (e) => { setPatientId(e.target.value) },
                                    disabled: true,

                                }}
                            />
                        </GridItem>
                    </GridContainer>


                    {/* ------------- NAME -------------*/}
                    < GridContainer >
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="First Name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: firstName,
                                    onChange: (e) => { setFirstName(e.target.value) },
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Father Name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: middleName,
                                    onChange: (e) => { setMiddleName(e.target.value) }
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Last Name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: lastName,
                                    onChange: (e) => { setLastName(e.target.value) }
                                }}
                            />
                        </GridItem>

                    </GridContainer>


                    {/* ------------- Details -------------*/}
                    < GridContainer >
                        <GridItem xs={12} sm={12} md={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="gender">Gender</InputLabel>
                                <Select
                                    labelId="gender"
                                    value={gender}
                                    onChange={(e) => { setGender(e.target.value) }}
                                >
                                    <MenuItem value={"MALE"}>Male</MenuItem>
                                    <MenuItem value={"FEMALE"}>Female</MenuItem>
                                </Select>
                            </FormControl>
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="hmo">Hmo</InputLabel>
                                <Select
                                    labelId="hmo"
                                    value={hmo}
                                    onChange={(e) => { setHmo(e.target.value) }}
                                >
                                    <MenuItem value={"Clalit"}>Clalit</MenuItem>
                                    <MenuItem value={"Meuhedet"}>Meuhedet</MenuItem>
                                    <MenuItem value={"Macabi"}>Macabi</MenuItem>
                                    <MenuItem value={"Leumit"}>Leumit</MenuItem>
                                </Select>
                            </FormControl>
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    defaultValue="2017-05-24"
                                    label="Birth date"
                                    value={birthdate}
                                    onChange={(e) => { setBirthdate(e); }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <MuiPhoneNumber
                                className={classes.phoneControl}
                                defaultCountry={'il'}
                                onChange={(e) => { setPhone(e) }}
                                value={phone}
                                countryCodeEditable={false}
                            />
                        </GridItem>
                    </GridContainer>



                    {/* ------------- ADDRESS -------------*/}
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                labelText="State"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: state,
                                    onChange: (e) => { setState(e.target.value) }
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                labelText="City"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: city,
                                    onChange: (e) => { setCity(e.target.value) }
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                labelText="Street"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: streetAddress,
                                    onChange: (e) => { setStreetAddress(e.target.value) }
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                labelText="House Number"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: houseNumber,
                                    onChange: (e) => { setHouseNumber(e.target.value) }
                                }}
                            />
                        </GridItem>
                    </GridContainer>



                    {/* ------------- VACCINE -------------*/}
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="vaccineStatus">vaccine Status</InputLabel>
                                <Select
                                    labelId="vaccineStatus"
                                    value={vaccineStatus}
                                    onChange={(e) => { setVaccineStatus(e.target.value) }}
                                >
                                    <MenuItem value={"Increase"}>Increase</MenuItem>
                                    <MenuItem value={"Spacing"}>Spacing</MenuItem>
                                    <MenuItem value={"MaintenanceDose"}>Maintenance Dose</MenuItem>
                                </Select>
                            </FormControl>
                        </GridItem>


                        <GridItem xs={12} sm={12} md={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="medicationSensitivity">medication Sensitivity</InputLabel>
                                <Select
                                    labelId="medicationSensitivity"
                                    value={medicationSensitivityAnswer}
                                    onChange={handleMedicationSensitivityAnswer}
                                >
                                    <MenuItem value={"true"}>Yes</MenuItem>
                                    <MenuItem value={"false"}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </GridItem>

                        {medicationSensitivityAnswer === "true" ?
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="medication Sensitivity notes"
                                    id="medicationSensitivity"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: medicationSensitivityNote,
                                        onChange: (e) => { setMedicationSensitivityNote(e.target.value) }
                                    }}
                                />
                            </GridItem>
                            : null}


                    </GridContainer>
                    <br></br>

                    <GridContainer>
                        <GridItem xs={12} sm={12} md={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="asthmaRhinitis">Diagnosis</InputLabel>
                                <Select
                                    labelId="asthmaRhinitis"
                                    value={asthmaRhinitis}
                                    onChange={(e) => { setAsthmaRhinitis(e.target.value) }}
                                >
                                    <MenuItem value={"Asthma"}>Asthma</MenuItem>
                                    <MenuItem value={"Rhinitis"}>Rhinitis</MenuItem>
                                </Select>
                            </FormControl>
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="antihistamine">need Antihistamine</InputLabel>
                                <Select
                                    labelId="antihistamine"
                                    value={antihistamine}
                                    onChange={(e) => { setAntihistamine(e.target.value) }}
                                >
                                    <MenuItem value={"yes"}>Yes</MenuItem>
                                    <MenuItem value={"no"}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </GridItem>
                    </GridContainer>
                    <br></br>

                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <InputLabel style={{ color: "#AAAAAA" }}>Notes:</InputLabel>
                            <CustomInput
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    multiline: true,
                                    rows: 5,
                                    value: notes,
                                    onChange: (e) => { setNotes(e.target.value) }
                                }}
                            />
                        </GridItem>
                    </GridContainer>

                </div>
                : null}

        </CardBody >

    );
})
export default DetailsLong;
