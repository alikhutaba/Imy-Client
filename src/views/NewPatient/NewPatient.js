import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearNewPatient } from '../../Redux/actions';

import PatientForm from "./PatientForm";
import Diagnosis from "./Diagnosis"

export default function AddPatient() {

    const dispatch = useDispatch();

    const [savedPatient, setSavedPatient] = useState(false);
    const [relode, setRelode] = useState(false);

    function finish() {
        setRelode(true)
        setSavedPatient(false)
        dispatch(clearNewPatient());

    }

    useEffect(() => {
        setRelode(false)
    }, [relode]);

    return (

        <div>
            {!relode ?
                <PatientForm savedState={{ savedPatient, setSavedPatient }} saved={setSavedPatient}></PatientForm>
                : null}

            {savedPatient ?
                <Diagnosis finish={finish}></Diagnosis>
                : null}
        </div>
    );
}
