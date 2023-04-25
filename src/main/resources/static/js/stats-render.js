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
}

//retrieve from REST API
async function allInfo(id = viewId){
    let url = "/api/user/" + id, newToOld;
    let personalStats = await fetch(url).then(response => response.json())
        .then(data => {
            // const {username, email, firstName, lastName, phoneNumber, bio, profilePicture} = data;
            viewerInfo(data);
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
<h1>First/Last: ${firstName} ${lastName}</h1>
<div>Phone num: ${phoneNumber}</div>
<div>bio: ${bio}</div>
<div>pic: ${profilePicture}</div>
<div>username:  ${username}</div>
<div>email: ${email}</div>
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
let chartBF , modalBF;
function bodyFatChart() {
    let bodyFat = [], weighInDate = [];
    bodyFatPercentArr.map(data => {
        bodyFat.unshift(parseFloat(data.clientInformation).toFixed(2));
        weighInDate.unshift(data.date);
    })
    chartBF = populateGraph("bodyFatChart", weighInDate, bodyFat, "Body Fat %");
    modalBF = populateGraph("bodyFatModal", weighInDate, bodyFat, "Body Fat %");
}

function populateGraph(elemId, dateArr, statArr, title){
    const ctx = document.getElementById(elemId).getContext('2d');
    const data = {
        labels: dateArr,
        datasets: [{
            label: title,
            data: statArr,
            backgroundColor: 'rgba(78,93,180,0.48)',
            borderColor: 'rgb(103,124,245)',
            borderWidth: 1,
        }],
    };

// axis labels are not populating...
    const options = {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true
                },
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    return new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}
