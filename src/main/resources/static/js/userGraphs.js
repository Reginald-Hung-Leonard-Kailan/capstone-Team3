// document.querySelector('meta[name="view"]').content = 2; //Yes this works
allInfo();
async function allInfo(){
    let graphId = document.querySelector('meta[name="view"]').content;
    let url = "/api/user/" + graphId;
    let personalStats = await fetch(url).then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    return data.clientInformationList;
                                }).catch(e => console.error(e));
    console.log("stats are" + personalStats);
}

