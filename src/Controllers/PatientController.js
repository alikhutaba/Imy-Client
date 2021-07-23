

async function sendPatientToServer(patient, userId) {

    var responeStatus = false;
    return new Promise((resolve, reject) => {

        fetch(`http://localhost:8081/patient/${userId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(patient)

        }).then(function (response) {
            responeStatus = response.ok;
            return response.json();
        }).then(function (data) {
            if (!responeStatus) {
                reject(data)
            } else {
                resolve(data)
            }
        })
    })

}




async function updatePatientInServer(patient, userId) {

    var responeStatus = false;
    return new Promise((resolve, reject) => {

        fetch(`http://localhost:8081/patient/${userId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(patient)

        }).then(function (response) {
            responeStatus = response.ok;
            return response
        }).then(function (response) {
            if (!responeStatus) {
                reject(response)
            } else {
                resolve(response)
            }
        })
    })

}




async function getPatientFromServer(patientId, userId) {

    var responeStatus = false;
    return new Promise((resolve, reject) => {

        fetch(`http://localhost:8081/patient/${userId}/byActivePatientId/${patientId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        }).then(function (response) {
            responeStatus = response.ok;
            return response.json();
        }).then(function (data) {
            if (!responeStatus) {
                reject(data)
            } else {
                resolve(data)
            }
        })
    })

}



async function getUnvalidPatients(userId, page = 0, size = 20) {
    var responeStatus = false;

    return new Promise((resolve, reject) => {

        fetch(`http://localhost:8081/patient/${userId}/activeAndUnvalidAll?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        }).then(function (response) {
            responeStatus = response.ok;
            return response.json();

        }).then(function (data) {
            if (!responeStatus) {
                reject(data)
            } else {
                resolve(data)
            }
        })
    })

}


async function validPatient(userId, patient) {
    var responeStatus = false;
    return new Promise((resolve, reject) => {

        fetch(`http://localhost:8081/patient/validate/${userId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(patient)

        }).then(function (response) {
            responeStatus = response.ok;
            return response.json();
        }).then(function (data) {
            if (!responeStatus) {
                reject(data)
            } else {
                resolve(data)
            }
        })
    })

}




export { sendPatientToServer, getPatientFromServer, updatePatientInServer, getUnvalidPatients, validPatient }
