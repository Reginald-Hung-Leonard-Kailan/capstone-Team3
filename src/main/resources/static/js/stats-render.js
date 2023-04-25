let viewId = document.querySelector("meta[name='view']").content,
    workoutPlanArr = [],
    bodyWeightArr = [],
    bodyFatPercentArr = [],
    squatArr = [],
    benchArr = [],
    deadliftArr = [],
    sleepArr = [],
    fatigueArr = [],
    helper;

render();

//This is our starting method
async function render(){
    await allInfo();
    renderSleep();
}

//retrieve from REST API
async function allInfo(id = viewId){
    let url = "/api/user/" + id, newToOld;
    let personalStats = await fetch(url).then(response => response.json())
        .then(data => {
            // const {username, email, firstName, lastName, phoneNumber, bio, profilePicture} = data;
            viewerInfo(data);
            console.log("data is: " + data);
            data = data.clientInformationList
            return data.sort((b, a) => new Date(a.date) - new Date(b.date));
        }).catch(e => console.error(e));

    personalStats.map(data => {
        switch (data.type){
            case "workoutPlan":
                workoutPlanArr.push(data);
                break;
            case "bodyWeight":
                bodyWeightArr.push(data);
                break;
            case "bodyFatPercent":
                bodyFatPercentArr.push(data);
                break;
            case "squat":
                squatArr.push(data);
                break;
            case "bench":
                benchArr.push(data);
                break;
            case "deadlift":
                deadliftArr.push(data);
                break;
            case "sleep":
                sleepArr.push(data);
                break;
            case "fatigue":
                fatigueArr.push(data);
                break;
        }
    })
}

//Personal Info card
function viewerInfo(data){
    let {username, email, firstName, lastName, phoneNumber, bio, profilePicture} = data,
        id = document.querySelector("#personal-info"),
        html = "";

    html = `<div class="card-content"> 
<div style="display: flex; justify-content: center;"><img id="user-stats-picture" src="${profilePicture}"/></div>
<h1>${firstName} ${lastName}</h1>
<div> ${phoneNumber}</div>
<div> ${email}</div>
<!--<div>bio: ${bio}</div>-->

</div>`;

    id.innerHTML = html;
}

//Sleep Ratings
function renderSleep(arr = sleepArr){
    let id = document.querySelector("#sleep-cards"),
        html = "";

    arr.forEach(data => {
        let {clientInformation, date, id} = data;
        html+= `
 <div class="card d-flex">
        <div>${clientInformation}</div> 
        <div>${date}</div> 
        <div>${id}</div>
</div>`
    })
    id.innerHTML = html;
}

/***
 * TODO:
 * -Add Fatigue to the calendar chart
 * -Populate the charts
 * -injuries
 * ---grab from our api
 * ---render it correctly
 * ---CRUD
 */