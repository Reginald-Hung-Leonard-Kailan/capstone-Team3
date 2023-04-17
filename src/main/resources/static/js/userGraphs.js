// document.querySelector('meta[name="view"]').content = 2; //Yes this works
allInfo();
async function allInfo(){
    let graphId = document.querySelector('meta[name="view"]').content;
    let url = "/api/user/" + graphId;
    let personalStats = await fetch(url).then(response => response.json())
                                .then(data => {
                                    // console.log(data);
                                    return data.clientInformationList;
                                }).catch(e => console.error(e));
    // console.log("stats are" + personalStats);
}

function addinfo(userId, discription, date, type) {
    //date format: "2023-01-01" && type is spelt out
    var clientInformation = {
        clientInformation: discription,
        date: date,
        type: type
    };
    const csrfToken = document.querySelector('meta[name="_csrf"]').content;
    const csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;
    fetch('/api/user/' + userId + '/details', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            [csrfHeader]: csrfToken
        },
        body: JSON.stringify(clientInformation)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}