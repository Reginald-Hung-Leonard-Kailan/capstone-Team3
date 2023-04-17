"use strict"
const id = document.querySelector("meta[name='loggedInId']").content;
let runMyFetch = clientArray(id);
let injuryFetch= injuryArray(id);
let smallInjuryFetch= smallInjuryArray(id);


// MY Clients Card
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
        <button class="viewer" value="${client[3]}">Stats</button>
      </div>
    </div>`
    }

    id.innerHTML = html;

    const viewerBtns = document.getElementsByClassName('viewer');

    for (let i = 0; i < viewerBtns.length; i++) {
        viewerBtns[i].addEventListener('click', function() {
            document.querySelector('meta[name="view"]').content = this.value;
            // allInfo();
        });
    }

}

async function allInfo(id){
    // let graphId = document.querySelector('meta[name="view"]').content;
    let url = "/api/user/" + id;
    let personalStats = await fetch(url).then(response => response.json())
        .then(data => {
            console.log("data is: " +data);
            return data.clientInformationList;
        }).catch(e => console.error(e));
    console.log("stats are" + personalStats);
}

// Injury Cards
function Injury(clients){
    let id = document.querySelector("#big-injury"), html=``;

    for(let i=0; i<clients.length; i++){
        let client=clients[i];
        html += `
<!--<div  class="modal-wide" id="injury-modal">-->
      <div class="client-card">
        <div>Status: ${client[0]}</div>
        <hr>
        <div>${client[1]}</div>
        <hr>
        <div>${client[2]}</div>
        <hr>
        <div>${client[3]}</div>
        <form action="/client-edit/${client[3]}"><button>Edit</button></form>
      </div>
<!--</div>-->
<!--<br>-->
`
    }
    // id.innerHTML = html;
    renderByClass('big-injury', html);
    let htmlSplit = html.split("<!--<br>-->");
    const injuryResponse = document.getElementsByClassName('injuryModal');
    for (let i =0; i<injuryResponse.length; i++){
        injuryResponse[i].addEventListener('click',()=>{
            renderByClass('injury-big-info', htmlSplit[i]);
            injuryModal.showModal();
        })
        // closeInjury.addEventListener('click',()=>{
        //     renderByClass('injury-modal', html);
        //     injuryModal.close();
        // })
    }
}
function smallInjury(clients){
    let html=``;

    for(let i=0; i<clients.length; i++){
        let client=clients[i];
        html += `

<div class="injury-stat-card injuryModal">
        <div>Status: ${client[0]}</div>
        <p>${client[2]}</p>
        <p>${client[1]}</p>
        </div>
<!--<br>-->
     
        `
    }
    // id.innerHTML = html;
    renderByClass('view-injury', html);
    let htmlSplit = html.split("<!--<br>-->");
    const injuryResponse = document.getElementsByClassName('injuryModal');
    Injury(clients)
}
function renderByClass(classname, html){
    let id = document.querySelector('#' + classname);
    id.innerHTML = html;
}





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
    // console.log(client)
    return client;
}

async function injuryArray(id){
    let url = "/api/user/" + id, clientArr;
    let injury = await fetch(url)
        .then(response => response.json() )
        .then(data => {
            let clientInfo = data.injuries;
            clientInfo= clientInfo.map(injury => [injury.status, injury.title, injury.injuryDate, injury.description])
            // clientInfo = clientInfo.map(client => [client.firstName, client.lastName, client.email, client.id]);
            return clientInfo
        }).catch(error => console.error(error));
   // Injury(injury);
    return injury;
}
async function smallInjuryArray(id){
    let url = "/api/user/" + id, clientArr;
    let injury = await fetch(url)
        .then(response => response.json() )
        .then(data => {
            let clientInfo = data.injuries;
            clientInfo= clientInfo.map(injury => [injury.status, injury.title, injury.injuryDate, injury.description])
            return clientInfo
        }).catch(error => console.error(error));
    smallInjury(injury);
    return injury;
}


