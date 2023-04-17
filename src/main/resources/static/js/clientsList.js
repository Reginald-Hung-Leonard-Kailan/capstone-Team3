"use strict"
const id = document.querySelector("meta[name='loggedInId']").content;
const nameSearch = document.getElementById("name");
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
        <form action="/client-edit/${client[3]}"><button>Edit</button></form>
        <form><button>Stats</button></form>
      </div>
      
    </div>`
    }

    id.innerHTML = html;

}



async function setUpSearchBar(){
    let clientList = await clientArray(id)
    nameSearch.addEventListener("keyup" , function (e){
        const search = e.target.value;
    let filterClientList = clientList.filter(client => {
        return (
            client[0].toLowerCase().includes(search.toLowerCase()) ||
            client[1].toLowerCase().includes(search.toLowerCase())
        );
    })
        editCard(filterClientList);
    })
}

setUpSearchBar();

async function clientArray(id){
    let url = "/api/user/" + id, clientArr;
    let client = await fetch(url)
        .then(response => response.json() )
        .then(data => {
            let clientInfo = data.clients.map(rel => rel.client);
            clientInfo = clientInfo.map(client => [client.firstName, client.lastName, client.email, client.id]);
            return clientInfo
        }).catch(error => console.error(error));
    editCard(client);
    return client;
}

