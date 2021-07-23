import {
    ADD_NEW_PATIENT_DETAILS,
    ADD_NEW_PATIENT_DIAGNOSIS,
    ADD_NEW_DIAGNOSIS_NUMBER,
    CLEAR_NEW_PATIENT,
} from "../actionsTypes";

const initialState = {
    patientData: {},
    diagnosis: [],
    diagnosisNumber: 0,
};

const patientReducers = (state = initialState, action) => {

    switch (action.type) {
        case ADD_NEW_PATIENT_DETAILS: {
            const { patient } = action.payload;
            return {
                ...state,
                patientData: patient,
            };
        }

        case ADD_NEW_PATIENT_DIAGNOSIS: {
            const { newDiagnosis } = action.payload;
            return {
                ...state,
                diagnosis: [...state.diagnosis, newDiagnosis],
            };
        }

        case ADD_NEW_DIAGNOSIS_NUMBER: {
            const { number } = action.payload;
            return {
                ...state,
                diagnosisNumber: number,
            };
        }

        case CLEAR_NEW_PATIENT: {
            return {
                patientData: {},
                diagnosis: [],
                diagnosisNumber: 0,
            };
        }

        default:
            return state;
    }
};

export default patientReducers;