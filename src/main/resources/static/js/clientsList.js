"use strict"
const id = document.querySelector("meta[name='loggedInId']").content;
let runMyFetch = clientArray(id);

function editCard(clients){
    let id = document.querySelector("#client-holder"), html=``;

    for(let i=0; i<clients.length; i++){
        let client=clients[i];
        html += `
     <div>
      <div class="client-card">
        <div>${client[0]}</div>
        <hr>
        <div>${client[1]}</div>
        <hr>
        <div>${client[2]}</div>
        <hr>
        <div>first.Last@email.com</div>
        <hr>
        <div>Bio</div>
      </div>
    </div>`
    }

    id.innerHTML = html;

}






async function clientArray(id){
    let url = "/api/user/"+ id, clientArr;
    let client = await fetch(url)
        .then(response => response.json() )
        .then(data => {
            let clientInfo = data.clients.map(rel => rel.client);
            clientInfo = clientInfo.map(client => [client.firstName, client.lastName, client.email]);
            return clientInfo
        }).catch(error => console.error(error));
    editCard(client);
    return client;
}

