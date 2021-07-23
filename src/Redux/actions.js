import {
    ADD_NEW_PATIENT_DETAILS,
    ADD_NEW_PATIENT_DIAGNOSIS,
    ADD_NEW_DIAGNOSIS_NUMBER,
    CLEAR_NEW_PATIENT,

    SAVE_ALL_ALLERGENS,
    SAVE_ALL_PROTOCOLS,
    SAVE_LOGIN_USER,
    SAVE_LOGOUT_USER,

    ADD_PATIENT_DETAILS,
    ADD_PATIENT_SESSION,
    ADD_PATIENT_DIAGNOSIS,
    CLEAR_PATIENT,
} from "./actionsTypes";





// new patient reducer

export const addPatient = patient => ({
    type: ADD_NEW_PATIENT_DETAILS,
    payload: { patient }
});

export const addDiagnosis = newDiagnosis => ({
    type: ADD_NEW_PATIENT_DIAGNOSIS,
    payload: { newDiagnosis }
});

export const addDiagnosisNumber = number => ({
    type: ADD_NEW_DIAGNOSIS_NUMBER,
    payload: { number }
});


export const clearNewPatient = number => ({
    type: CLEAR_NEW_PATIENT
});








// static data reducer

export const saveAllAllergens = allergens => ({
    type: SAVE_ALL_ALLERGENS,
    payload: { allergens }
});

export const saveAllProtocols = protocols => ({
    type: SAVE_ALL_PROTOCOLS,
    payload: { protocols }
});

export const login = user => ({
    type: SAVE_LOGIN_USER,
    payload: { user }
});


export const logout = user => ({
    type: SAVE_LOGOUT_USER,
    payload: { user }
});







// Patient reducer

export const addPatientDetails = patient => ({
    type: ADD_PATIENT_DETAILS,
    payload: { patient }
});

export const addPatientSession = session => ({
    type: ADD_PATIENT_SESSION,
    payload: { session }
});

export const addPatientDiagnosis = diagnosis => ({
    type: ADD_PATIENT_DIAGNOSIS,
    payload: { diagnosis }
});

export const claerPatient = patient => ({
    type: CLEAR_PATIENT,
    payload: { patient }
});

















