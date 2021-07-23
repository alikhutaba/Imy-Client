

async function sendDiagnosisToServer(diagnosis, userId) {

    var responeStatus = false;
    return new Promise((resolve, reject) => {

        fetch(`http://localhost:8081/diagnosis/${userId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(diagnosis)

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


async function updateDiagnosis(diagnosis, userId) {

    var responeStatus = false;
    return new Promise((resolve, reject) => {

        fetch(`http://localhost:8081/diagnosis/${userId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(diagnosis)

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



async function GetDiagnosisByPatient(userId, patientId) {

    var responeStatus = false;
    return new Promise((resolve, reject) => {

        fetch(`http://localhost:8081/diagnosis/${userId}/byPatient/${patientId}`, {
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




export { sendDiagnosisToServer, GetDiagnosisByPatient, updateDiagnosis }
