import {
    ADD_PATIENT_DETAILS,
    ADD_PATIENT_SESSION,
    ADD_PATIENT_DIAGNOSIS,
    CLEAR_PATIENT,


} from "../actionsTypes";

const initialState = {
    patientData: {
        patientId: "",
        fisrtName: "",
        lastName: "",
        middleName: "",
        birthdate: {
            days: "1",
            months: "1",
            years: "1900",
        },
        gender: "",
        phone1: "",
        address: {
            state: "",
            city: "",
            streetAddress: "",
            houseNumber: "",
        },
        added_by: {},
        validated_by: {},
        hmo: "",
        vaccineStatus: "",
        medicationSensitivity: {
            answer: "",
            notes: "",

        },
        asthmaRhinitis: "",
        antihistamine: "",
        notes: "",
    },
    savedPatient: false,

    patientSession: {},
    savedSession: false,

    patientDiagnosis: [],


};

const sessionReducers = (state = initialState, action) => {

    switch (action.type) {
        case ADD_PATIENT_DETAILS: {
            const { patient } = action.payload;
            return {
                ...state,
                patientData: patient,
                savedPatient: true,
            };
        }

        case ADD_PATIENT_SESSION: {
            const { session } = action.payload;
            return {
                ...state,
                patientSession: session,
                savedSession: true,
            };
        }


        case ADD_PATIENT_DIAGNOSIS: {
            const { diagnosis } = action.payload;
            return {
                ...state,
                patientDiagnosis: diagnosis,
            };
        }


        case CLEAR_PATIENT: {
            const { patient } = action.payload;
            return {
                ...state,
                patientData: patient,
                savedPatient: false,
                patientSession: {},
                savedSession: false,
                patientDiagnosis: [],
            };
        }




        default:
            return state;
    }
};

export default sessionReducers;
