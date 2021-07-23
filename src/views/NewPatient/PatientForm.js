import React, { useState } from "react";
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
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { validatePatient } from "Validators/Validator";
import { sendPatientToServer } from "Controllers/PatientController";
import { addPatient } from '../../Redux/actions';
import { useSelector, useDispatch } from "react-redux";



import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


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
  }

};


const useStyles1 = makeStyles((theme) => ({
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
}));

const useStyles = makeStyles(styles);

export default function NewPatient(props) {

  const classes = useStyles();
  const classess = useStyles1();
  const dispatch = useDispatch();

  const logedinUser = useSelector((state) => state.StaticData.logedinUser);

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
  const [medicationSensitivityAnswer, setMedicationSensitivityAnswer] = useState('')
  const [medicationSensitivityNote, setMedicationSensitivityNote] = useState("")
  const [asthmaRhinitis, setAsthmaRhinitis] = useState("")
  const [antihistamine, setAntihistamine] = useState("")
  const [notes, setNotes] = useState("")

  function handlePatientId(e) {
    setPatientId(e.target.value)
  }

  function handleFirstName(e) {
    setFirstName(e.target.value)
  }

  function handleLastName(e) {
    setLastName(e.target.value)
  }

  function handleMiddleName(e) {
    setMiddleName(e.target.value)
  }

  const handleDateChange = (date) => {
    setBirthdate(date);
  }

  const handleGender = (event) => {
    setGender(event.target.value);
  }

  const handlePhone = (event) => {
    setPhone(event)
  }

  function handleState(e) {
    setState(e.target.value)
  }

  function handleCity(e) {
    setCity(e.target.value)
  }

  function handleStreetAddress(e) {
    setStreetAddress(e.target.value)
  }

  function handleHouseNumber(e) {
    setHouseNumber(e.target.value)
  }

  const handleHmo = (event) => {
    setHmo(event.target.value);
  }

  const handleVaccineStatus = (event) => {
    setVaccineStatus(event.target.value);
  }

  const handleMedicationSensitivityAnswer = (event) => {
    setMedicationSensitivityAnswer(event.target.value);
    if (event.target.value === "false")
      setMedicationSensitivityNote("")
  }

  function handleMedicationSensitivityNote(e) {
    setMedicationSensitivityNote(e.target.value)
  }

  function handleAsthmaRhinitis(e) {
    setAsthmaRhinitis(e.target.value)
  }

  function handleAntihistamine(e) {
    setAntihistamine(e.target.value)
  }

  function handleNotes(e) {
    setNotes(e.target.value)
  }



  async function savePatient() {

    const newPatient = {};
    newPatient.patientId = patientId;
    newPatient.fisrtName = firstName;
    newPatient.lastName = lastName;
    newPatient.middleName = middleName;
    newPatient.birthdate = {};
    if (birthdate !== undefined && birthdate !== '') {
      newPatient.birthdate.days = birthdate.getDate();
      newPatient.birthdate.months = birthdate.getMonth() + 1;
      newPatient.birthdate.years = birthdate.getFullYear();
    }

    newPatient.gender = gender;
    newPatient.phone1 = phone;
    newPatient.address = {};
    newPatient.address.state = state;
    newPatient.address.city = city;
    newPatient.address.streetAddress = streetAddress;
    newPatient.address.houseNumber = houseNumber;
    newPatient.hmo = hmo;
    newPatient.added_by = logedinUser;
    newPatient.vaccineStatus = vaccineStatus;
    newPatient.medicationSensitivity = {};
    newPatient.medicationSensitivity.answer = medicationSensitivityAnswer;
    newPatient.medicationSensitivity.notes = medicationSensitivityNote;

    newPatient.asthmaRhinitis = asthmaRhinitis;
    newPatient.antihistamine = antihistamine;
    newPatient.notes = notes;


    var valid = await validatePatient(newPatient);

    if (valid) {
      await sendPatientToServer(newPatient, logedinUser.userId)
        .then(data => {
          dispatch(addPatient(data));
          props.saved(true)
          toast.success("Patient saved successfuly ", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        }).catch(e => {
          toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        });
    }

  }


  return (
    <div>
      <GridContainer>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color={"primary"}>
              <h4 className={classes.cardTitleWhite}>New Patient</h4>
              <p className={classes.cardCategoryWhite}>{"Patient details"}</p>
            </CardHeader>

            <CardBody>

              {/* ------------- ID -------------*/}
              < GridContainer >
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Patient ID"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ value: patientId, onChange: handlePatientId }}
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
                      onChange: handleFirstName,
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Father Name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ value: middleName, onChange: handleMiddleName }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Last Name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ value: lastName, onChange: handleLastName }}
                  />
                </GridItem>

              </GridContainer>


              {/* ------------- Details -------------*/}
              < GridContainer >
                <GridItem xs={12} sm={12} md={3}>
                  <FormControl className={classess.formControl}>
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                      labelId="gender"
                      value={gender}
                      onChange={handleGender}
                    >
                      <MenuItem value={"MALE"}>Male</MenuItem>
                      <MenuItem value={"FEMALE"}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <FormControl className={classess.formControl}>
                    <InputLabel id="hmo">Hmo</InputLabel>
                    <Select
                      labelId="hmo"
                      value={hmo}
                      onChange={handleHmo}
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
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <MuiPhoneNumber
                    className={classess.phoneControl}
                    defaultCountry={'il'}
                    onChange={handlePhone}
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
                    inputProps={{ value: state, onChange: handleState }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="City"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ value: city, onChange: handleCity }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Street"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ value: streetAddress, onChange: handleStreetAddress }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="House Number"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ value: houseNumber, onChange: handleHouseNumber }}
                  />
                </GridItem>
              </GridContainer>


              {/* ------------- VACCINE -------------*/}
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <FormControl className={classess.formControl}>
                    <InputLabel id="vaccineStatus">vaccine Status</InputLabel>
                    <Select
                      labelId="vaccineStatus"
                      value={vaccineStatus}
                      onChange={handleVaccineStatus}
                    >
                      <MenuItem value={"Increase"}>Increase</MenuItem>
                      <MenuItem value={"Spacing"}>Spacing</MenuItem>
                      <MenuItem value={"MaintenanceDose"}>Maintenance Dose</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>


                <GridItem xs={12} sm={12} md={3}>
                  <FormControl className={classess.formControl}>
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
                      inputProps={{ value: medicationSensitivityNote, onChange: handleMedicationSensitivityNote }}
                    />
                  </GridItem>
                  : null}


              </GridContainer>
              <br></br>

              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <FormControl className={classess.formControl}>
                    <InputLabel id="asthmaRhinitis">Diagnosis</InputLabel>
                    <Select
                      labelId="asthmaRhinitis"
                      value={asthmaRhinitis}
                      onChange={handleAsthmaRhinitis}
                    >
                      <MenuItem value={"Asthma"}>Asthma</MenuItem>
                      <MenuItem value={"Rhinitis"}>Rhinitis</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>


                <GridItem xs={12} sm={12} md={3}>
                  <FormControl className={classess.formControl}>
                    <InputLabel id="antihistamine">need Antihistamine</InputLabel>
                    <Select
                      labelId="antihistamine"
                      value={antihistamine}
                      onChange={handleAntihistamine}
                    >
                      <MenuItem value={"yes"}>Yes</MenuItem>
                      <MenuItem value={"no"}>No</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <br></br>


              {/* <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>nursing History:</InputLabel>
                  <CustomInput
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      value: nursingHistory,
                      onChange: handleNursingHistory
                    }}
                  />
                </GridItem>
              </GridContainer> */}

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Notes:</InputLabel>
                  <CustomInput
                    value={{ value: notes, setValue: setNotes }}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      value: notes,
                      onChange: handleNotes
                    }}
                  />
                </GridItem>
              </GridContainer>

            </CardBody>

            <CardFooter>
              <Button onClick={savePatient} color="primary">Save</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div >
  );
}