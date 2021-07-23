

async function calculateInjections(injection, userId) {

    var responeStatus = false;
    return new Promise((resolve, reject) => {

        fetch(`http://localhost:8081/injection/calculate/${userId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(injection)

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



async function sendInjectionsToServer(injection, userId) {

    var responeStatus = false;
    return new Promise((resolve, reject) => {

        fetch(`http://localhost:8081/injection/${userId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(injection)

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



async function getInjectionByAllergenProtocol(userId, allergenProtocolId) {
    var responeStatus = false;
    return new Promise((resolve, reject) => {

        fetch(`http://localhost:8081/injection/${userId}/byAllergenProtocolId/${allergenProtocolId}`, {
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




export { calculateInjections, sendInjectionsToServer, getInjectionByAllergenProtocol }
