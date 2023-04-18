
let workoutPlanArr = [],
    bodyWeightArr = [],
    bodyFatPercentArr = [],
    squatArr = [],
    benchArr = [],
    deadliftArr = [],
    sleepArr = [],
    fatigueArr = [];



function renderSleep(sleepArr){
    let id = document.querySelector("#edit-sleep"), html=``;

    for(let i=0; i<sleepArr.length; i++){
        let sleep = sleepArr[i];
        html += `
                 <div>${sleep.date +': '+ sleep.clientInformation}</div>
                 <hr>`
    }

    id.innerHTML = html;
}

function renderFatigue(fatigueArr){
    let id = document.querySelector("#edit-fatigue"), html=``;

    for(let i=0; i<fatigueArr.length; i++){
        let fatigue = fatigueArr[i];
        html += `
                <div>${fatigue.date +':'+ fatigue.clientInformation}</div>
                <hr>`
    }

    id.innerHTML = html;
}

// Body Fat %
function bodyFatChart() {
    let bodyFat = [], weighInDate = [];
    bodyFatPercentArr.map(data => {
        bodyFat.unshift(parseInt(data.clientInformation));
        weighInDate.unshift(data.date);
    })
    populateGraph("bodyFatChart", weighInDate, bodyFat, "Body Fat %");
    populateGraph("bodyFatModal", weighInDate, bodyFat, "Body Fat %");
}

// Body Weight
function bodyWeightChart() {
    let bodyWeight = [], bodyweightInDate = [];
    bodyWeightArr.map(data => {
        bodyWeight.unshift( parseInt( data.clientInformation ) );
        bodyweightInDate.unshift( data.date );
    })
    populateGraph("bodyWeightChart", bodyweightInDate, bodyWeight, "Body Weight");
    populateGraph("bodyWeightModal", bodyweightInDate, bodyWeight, "Body Weight");
}

// Squat
function squatChart() {
    let squatWeight = [], squatDate = [];
    squatArr.map(data => {
        squatWeight.unshift( parseInt( data.clientInformation ) );
        squatDate.unshift( data.date );
    })
    populateGraph("squatChart", squatDate, squatWeight, "Squat Weight");
    populateGraph("squatModal", squatDate, squatWeight, "Squat Weight");
}

// BenchChart
function benchChart() {
    let benchWeight = [], benchDate = [];
    benchArr.map(data => {
        benchWeight.unshift( parseInt( data.clientInformation ) );
        benchDate.unshift( data.date );
    })
    populateGraph('benchChart', benchDate, benchWeight, 'Bench');
    populateGraph('benchModal', benchDate, benchWeight, 'Bench');
}

// Body Fat %
function deadLiftChart() {
    let deadLift = [], liftDate = [];
    deadliftArr.map(data => {
        deadLift.unshift( parseInt( data.clientInformation ) );
        liftDate.unshift( data.date );
    })
    populateGraph('deadLiftChart', liftDate, deadLift, 'Deadlift');
    populateGraph('deadliftModal', liftDate, deadLift, 'Deadlift');
}

function populateGraph(elemId, dateArr, statArr, title){
    const ctx = document.getElementById(elemId).getContext('2d');
    const data = {
        labels: dateArr,
        datasets: [{
            label: title,
            data: statArr,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        }],
    };

// axis labels are not populating...
    const options = {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Weight in lb'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Months throughout the Year'
                },
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    const myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}
//Simplify

async function graphInfo(){
    let id = document.querySelector('meta[name="view"]').content;
    let url = "/api/user/" + id + '/details';
    let personalStats = await fetch(url).then(response => response.json())
                                .then(data => {
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
    renderSleep(sleepArr);
    renderFatigue(fatigueArr);
    benchChart();
    bodyFatChart();
    bodyWeightChart();
    squatChart();
    deadLiftChart();
}

function addInfo( info, date, type){
    let clientInformation = {
        clientInformation: info,
        date: addOneDay(date),
        type: type
    };
    touchApi(clientInformation);

}

function editInfo(id, info, date, type){
    let detailId = parseInt(id),
        clientInfo = {
        id: detailId,
        clientInformation: info,
        date: addOneDay(date),
        type: type
    };
    (info !== '0')? touchApi(clientInfo):deleteInfo(id);
}

function deleteInfo(infoId) {
    const csrfToken = document.querySelector('meta[name="_csrf"]').content,
        csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;
    let id = document.querySelector('meta[name="view"]').content;

    fetch(`/api/user/${id}/details/${infoId}`, {
        method: 'DELETE',
        headers: {
            [csrfHeader]: csrfToken
        }
    }).then(response => {
            if (response.ok) {
                console.log(`Deleted ClientInformation with ID ${infoId}`);
            } else {
                console.error(`Error deleting ClientInformation with ID ${infoId}: ${response.status} ${response.statusText}`);
            }
        })
        .catch(error => console.error(`Error deleting ClientInformation with ID ${infoId}: ${error}`));
    resetAll();
    graphInfo();
}

//This is for editing or adding
function touchApi( clientInformation) {
    //date format: "2023-01-01" && type is spelt out
    let id = document.querySelector('meta[name="view"]').content;
    const csrfToken = document.querySelector('meta[name="_csrf"]').content;
    const csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;
    fetch('/api/user/' + id + '/details', {
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
    resetAll();
    graphInfo();
}

function addOneDay(newDate) {
    var dateObj = new Date(newDate + 'T00:00:00Z');
    dateObj.setUTCDate(dateObj.getUTCDate() + 1);
    var year = dateObj.getUTCFullYear();
    var month = ('0' + (dateObj.getUTCMonth() + 1)).slice(-2);
    var day = ('0' + dateObj.getUTCDate()).slice(-2);
    return year + '-' + month + '-' + day;
}

function resetAll(){
    workoutPlanArr = [],
        bodyWeightArr = [],
        bodyFatPercentArr = [],
        squatArr = [],
        benchArr = [],
        deadliftArr = [],
        sleepArr = [],
        fatigueArr = [];
}
