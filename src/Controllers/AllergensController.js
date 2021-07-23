
async function getallAllergensFromServer(userId) {
    var responeStatus = false;
    return new Promise((resolve, reject) => {

        fetch(`http://localhost:8081/allergen/${userId}/all`, {
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


export { getallAllergensFromServer }
