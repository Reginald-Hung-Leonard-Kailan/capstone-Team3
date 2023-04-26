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
    bodyFatChart();
    bodyWeightChart()
    squatChart()
    benchChart()
    deadliftChart()
}

//retrieve from REST API
async function allInfo(id = viewId){
    let url = "/api/user/" + id, newToOld;
    let personalStats = await fetch(url).then(response => response.json())
        .then(data => {
            // const {username, email, firstName, lastName, phoneNumber, bio, profilePicture} = data;
            viewerInfo(data);
            data = data.clientInformationList;
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
        if(profilePicture === null){
            profilePicture= "../img/profilePicPlaceholder.png";
    }

    html = `<div class="card-content"> 
<div style="display: flex; justify-content: center;"><img id="user-stats-picture" src="${profilePicture}"/></div>
<h1>${firstName} ${lastName}</h1>
<div> ${phoneNumber}</div>
<div> ${email}</div>
<!--<div>bio: ${bio}</div>-->

</div>`;

    id.innerHTML = html;
}

//Injury Info card

function showInjury(data){
    let {injuryDate, status, title, description} = data.injuries,
        id = document.querySelector("#injury-info"),
        html = "";

    for(let i = 0 ; i < data.injuries.length ; i++ ){

        let injury = data.injuries[i];
        html += `<tr>
                  <td>Injury</td>
                  <td class="d-none d-xl-table-cell">${injury.injuryDate}</td>
                  <td class="d-none d-xl-table-cell">${injury.title}</td>
                  <td><span id="injury-status" style="color: #0a0a0a">${injury.status}</span></td>
                  <td class="d-none d-md-table-cell">${injury.description}</td>
                  <td class="d-none d-md-table-cell"><a href="/injury/edit/${injury.id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></a></td> 
                </tr>`;
    }



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
        <div>${date}</div> 
        <div>${clientInformation}</div> 
        <div>${id}</div>
</div>`
    })
    id.innerHTML = html;
}

/*
 * TODO:
 * -Add Fatigue to the calendar chart
 * -Populate the charts
 * -injuries
 * ---grab from our api
 * ---render it correctly
 * ---CRUD
 */



//Graphs!!

//Body Fat
// let chartBF , modalBF;
// function bodyFatChart() {
//     let bodyFat = [], weighInDate = [];
//     bodyFatPercentArr.map(data => {
//         bodyFat.unshift(parseFloat(data.clientInformation).toFixed(2));
//         weighInDate.unshift(data.date);
//     })
//     chartBF = populateGraph("bodyFatChart", weighInDate, bodyFat, "Body Fat %");
//     // modalBF = populateGraph("bodyFatModal", weighInDate, bodyFat, "Body Fat %");
// }

// function populateGraph(elemId, dateArr, statArr, title){
//     const ctx = document.getElementById(elemId).getContext('2d');
//     const data = {
//         labels: dateArr,
//         datasets: [{
//             label: title,
//             data: statArr,
//             backgroundColor: 'rgba(78,93,180,0.48)',
//             borderColor: 'rgb(103,124,245)',
//             borderWidth: 1,
//         }],
//     };
//
// // axis labels are not populating...
//     const options = {
//         scales: {
//             yAxes: [{
//                 scaleLabel: {
//                     display: true
//                 }
//             }],
//             xAxes: [{
//                 scaleLabel: {
//                     display: true
//                 },
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     };
//
//     return new Chart(ctx, {
//         type: 'line',
//         data: data,
//         options: options
//     });
// }
