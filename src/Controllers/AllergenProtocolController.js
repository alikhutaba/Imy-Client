

async function sendAllergenProtocolToServer(diagnosis, userId) {

    var responeStatus = false;
    return new Promise((resolve, reject) => {

        fetch(`http://localhost:8081/allergenProtocols/${userId}`, {
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


async function updateAllergenProtocol(allergenProtocol, userId) {

    var responeStatus = false;
    return new Promise((resolve, reject) => {

        fetch(`http://localhost:8081/allergenProtocols/${userId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(allergenProtocol)

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



async function getAllergenProtocolsByDiagnosis(userId, diagnosisId) {

    var responeStatus = false;
    return new Promise((resolve, reject) => {

        fetch(`http://localhost:8081/allergenProtocols/${userId}/byDiagnosis/${diagnosisId}`, {
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


export { sendAllergenProtocolToServer, getAllergenProtocolsByDiagnosis, updateAllergenProtocol }
