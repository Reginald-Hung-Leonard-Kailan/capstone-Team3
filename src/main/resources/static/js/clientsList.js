"use strict"
start()
const id = document.querySelector("meta[name='loggedInId']").content;
const nameSearch = document.getElementById("name");
let runMyFetch = clientArray(id);
let injuryFetch= injuryArray(id);
let smallInjuryFetch= smallInjuryArray(id);

async function start(){
    const id = document.querySelector("meta[name='view']").content;
    let injuryFetch= injuryArray(id);
    let smallInjuryFetch= smallInjuryArray(id);
    // await resetAll();
    await run();
}

let newHelper;
// MY Clients Card
function editCard(clients){
    const csrfToken = document.querySelector('meta[name="_csrf"]').content;
    let id = document.querySelector("#client-holder"), html=``;

    for(let i=0; i<clients.length; i++){
        let client=clients[i];
        html += `
       <div class="col-lg-4 col-sm-6">
        <div class="card profile-card-3">
        <form  id="delete-client-form" action="/client-false/${client[3]}" method="POST" style="background-color: #efefef" >
                <input type="hidden" name="_csrf" value="${csrfToken}">
                <button id="delete-client" class="d-flex btn-outline-danger" style="border: none;">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 align-middle me-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
</button>
            </form>
        <div class="background-block">
            <img src="../img/client-background.jpg" alt="profile-sample1" class="background img-thumbnail" style="background-size: contain;"/>
        </div>
       
        <div class="profile-thumb-block">
            <img src="../img/profilePicPlaceholder.png" alt="profile-image" class="profile"/>
        </div>
        <div class="card-content">
            <h2>${client[0]} ${client[1]}<small>${client[2]}</small></h2>
                <div class="icon-block d-flex justify-content-around">
                <a href="/client-edit/${client[3]}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit align-middle"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </a>
                <a class="viewer tablinks search-button client-allign-button" href="/stats/${client[3]}" value="${client[3]}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sliders align-middle"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                </a>
                </div>
        </div>
    </div>
</div>`
    }

    id.innerHTML = html;

    const viewerBtns = document.getElementsByClassName('viewer');

    for (let i = 0; i < viewerBtns.length; i++) {
        viewerBtns[i].addEventListener('click', async function() {
            let value = this.getAttribute('value')
            document.querySelector('meta[name="view"]').content = value;
            document.querySelector('form[name="addInjury"]').action = "/add-injury/"+value;
            // allInfo();
            // await resetAll();
            // await start();
            // graphInfo(); //watch this...

            // await run();
        });
    }

}

async function run() {
    await setAllArr();
    await popAll();
    await showPlans();
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
    const csrfToken = document.querySelector('meta[name="_csrf"]').content;
    const csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;
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
        <hr>
<!--        <div>${client[4]}</div>-->
        <form action="/injury/edit/${client[4]}"><button>Edit</button></form>
        <form method="POST" action="/injury/delete/${client[4]}">
        <input type="hidden" name="_csrf" value="${csrfToken}">
        <button>Delete</button></form>
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
    let id = document.querySelector('meta[name="view"]').content;

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
            let clientInfo = [];
            data.clients.map(rel => {
                if(rel.active === true) {
                    clientInfo.push(rel.client);
                }
            });
            clientInfo = clientInfo.map(client => [client.firstName, client.lastName, client.email, client.id]);
            // console.log(clientInfo)
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
            clientInfo= clientInfo.map(injury => [injury.status, injury.title, injury.injuryDate, injury.description, injury.id])
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
            clientInfo= clientInfo.map(injury => [injury.status, injury.title, injury.injuryDate, injury.description, injury.id])
            return clientInfo
        }).catch(error => console.error(error));
    smallInjury(injury);
    return injury;
}


