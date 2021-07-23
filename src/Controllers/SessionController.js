

async function sendSessionToServer(session) {

    var responeStatus = false;
    return new Promise((resolve, reject) => {

        fetch(`http://localhost:8081/session`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(session)

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



function getuserbyid(userId) {

    return new Promise((resolve, reject) => {

        fetch(`http://localhost:8081/user/${userId}/byUserId/${userId}`, {

            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
            },
        }).then(r => r.json())
            .then(data => {
                resolve(data)
            })
    })

}


export { sendSessionToServer, getuserbyid }
