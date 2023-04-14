// document.querySelector('meta[name="view"]').content = 2; //Yes this works
let graphId = document.querySelector('meta[name="view"]').content;
allInfo(graphId);

async function allInfo(id){
    let url = "/api/user/" + id;
    let personalStats = await fetch(url).then(response => response.json())
                                .then(data => data.clientInformationList);
    console.log(personalStats);
}