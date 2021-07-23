import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config()
toast.configure()


async function validatePatient(patient) {


    if (!validateID(patient.patientId)) {
        toast.error("Unvalid Patient ID", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }


    if (patient.fisrtName <= 0) {
        toast.error("Patient first name is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }

    // if (patient.middleName <= 0) {
    //     toast.error("Patient middle name is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
    //     return false;
    // }

    if (patient.lastName <= 0) {
        toast.error("Patient last name is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }

    if (patient.gender <= 0) {
        toast.error("Patient gender is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }
    if (patient.hmo <= 0) {
        toast.error("Patient Hmo is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }
    //birthdate
    if (patient.birthdate.days === undefined || patient.birthdate.months === undefined || patient.birthdate.years === undefined) {
        // if (!(Object.keys(patient).length === 0 && patient.constructor === Object)) {
        toast.error("Patient birthday is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }
    if (patient.phone1 <= 0) {
        toast.error("Patient phone number is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }
    if (patient.address.state <= 0) {
        toast.error("Patient address state is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }

    if (patient.address.city <= 0) {
        toast.error("Patient address city is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }
    if (patient.address.streetAddress <= 0) {
        toast.error("Patient address street is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }
    if (patient.address.houseNumber <= 0 || !isNumeric(patient.address.houseNumber)) {
        toast.error("Unvalid Patient address house number", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }

    if (patient.vaccineStatus <= 0) {
        toast.error("Patient vaccine status is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }
    /* eslint eqeqeq: 0 */
    if (patient.medicationSensitivity.answer != "false" && patient.medicationSensitivity.answer != "true") {
        toast.error("Patient medication sensitivity is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }
    /* eslint eqeqeq: 0 */
    if (patient.medicationSensitivity.answer === "true" && patient.medicationSensitivity.notes <= 0) {
        toast.error("Patient medication sensitivity notes is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }
    if (patient.asthmaRhinitis <= 0) {
        toast.error("Patient Diagnosis is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }
    if (patient.antihistamine <= 0) {
        toast.error("Patient antihistamine is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }

    return true;

}

function validateID(id) {

    if (id.length != 9 || !isNumeric(id))
        return false
    else
        return true;
}

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}






async function validateSession(session) {


    if (session.antihistamineBeforeVaccination.answer != 'false' && session.antihistamineBeforeVaccination.answer != 'true' && session.antihistamineBeforeVaccination.answer != 'not Relevant') {
        toast.error("Patient antihistamine is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }
    if (session.antihistamineBeforeVaccination.answer == 'false' && session.antihistamineBeforeVaccination.notes <= 0) {
        toast.error("Patient antihistamine notes is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }

    if (session.howThePreviousInjectionWent.answer != 'false' && session.howThePreviousInjectionWent.answer != 'true') {
        toast.error("Patient Abnormalities is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }
    if (session.howThePreviousInjectionWent.answer == 'false' && session.howThePreviousInjectionWent.notes <= 0) {
        toast.error("Patient Abnormalities notes is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }

    if (session.howYouFeelToday.answer != 'false' && session.howYouFeelToday.answer != 'true') {
        toast.error("Patient feel today is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }
    if (session.howYouFeelToday.answer == 'false' && session.howYouFeelToday.notes <= 0) {
        toast.error("Patient feel today notes is embty", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        return false;
    }



    return true;
}




export { validatePatient, validateSession }
