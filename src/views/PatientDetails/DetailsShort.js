import React from "react";
// @material-ui/core components
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardBody from "components/Card/CardBody.js";

import { useSelector } from "react-redux";


export default function DetailsShort() {

    const patient = useSelector((state) => state.Patient.patientData);

    return (
        < CardBody >

            < GridContainer >
                <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                        labelText="Patient ID"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            value: patient.patientId,
                            disabled: true,
                            style: { color: '#000000' }
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        labelText="Name"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            value: patient.fisrtName + " " + patient.middleName + " " + patient.lastName,
                            disabled: true,
                            style: { color: '#000000' }
                        }}
                    />
                </GridItem>


                <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                        labelText="Gender"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            value: patient.gender === 'MALE' ? 'Male' : patient.gender === 'FEMALE' ? 'Female' : '',
                            disabled: true,
                            style: { color: '#000000' }
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                        labelText="Birthday"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            value: patient.birthdate.days + "/" + patient.birthdate.months + "/" + patient.birthdate.years,
                            disabled: true,
                            style: { color: '#000000' }
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                        labelText="Phone number"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            value: patient.phone1,
                            disabled: true,
                            style: { color: '#000000' }
                        }}
                    />
                </GridItem>
            </GridContainer>


            < GridContainer >
                <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                        labelText="Address"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            value: patient.address.streetAddress + " " + patient.address.houseNumber + " " + patient.address.city + ", " + patient.address.state,
                            disabled: true,
                            style: { color: '#000000' }
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                        labelText="Hmo"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            value: patient.hmo,
                            disabled: true,
                            style: { color: '#000000' }
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                        labelText="Vaccine status"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            value: patient.vaccineStatus,
                            disabled: true,
                            style: { color: '#000000' }
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                        labelText="Medication Sensitivity"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            value: patient.medicationSensitivity.answer === "false" ? "No" : "Yes, " + patient.medicationSensitivity.notes,
                            disabled: true,
                            style: { color: '#FF4500' }
                        }}
                    />
                </GridItem>

            </GridContainer>

            <br></br>

            <GridContainer>
                <GridContainer xs={4} sm={4} md={4} style={{ padding: "15px" }}>

                    <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                            labelText="Diagnosis"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: patient.asthmaRhinitis,
                                disabled: true,
                                style: { color: '#000000' }
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                            labelText="need Antihistamine"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: patient.antihistamine,
                                disabled: true,
                                style: { color: '#000000' }
                            }}
                        />
                    </GridItem>
                </GridContainer>

                <GridContainer xs={8} sm={8} md={8} style={{ padding: "35px" }}>

                    <GridItem xs={12} sm={12} md={12}>
                        <InputLabel style={{ color: "#AAAAAA" }}>Notes:</InputLabel>
                        <CustomInput
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 3,
                                value: patient.notes,
                                disabled: true,
                                style: { color: '#000000' }
                            }}
                        />
                    </GridItem>
                </GridContainer>
            </GridContainer>

        </CardBody >

    );
}

