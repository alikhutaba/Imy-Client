import { combineReducers } from "redux";

import NewPatient from "./NewPatientReducer"
import StaticData from "./staticDataReducer"
import Patient from "./PatientReducer"

export default combineReducers({ NewPatient, StaticData, Patient });