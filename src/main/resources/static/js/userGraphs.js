
let workoutPlanArr = [],
    bodyWeightArr = [],
    bodyFatPercentArr = [],
    squatArr = [],
    benchArr = [],
    deadliftArr = [],
    sleepArr = [],
    fatigueArr = [];


function renderSleep(){
    let id = document.querySelector("#sleep-days"),
        html=``,
        weekNames = getWeekdayNames(),
        oneWeekAgo = new Date(),
        total = 0,
        count = 0;

    let entries =[];

    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    let weekOldSleep = sleepArr.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= oneWeekAgo;
    });

    weekOldSleep.map(obj => {
        let {date, clientInformation, id, type} = obj,
            weekDay = getDayOfWeek( date );
        entries.push({ weekDay, clientInformation, id, type} );
    });

    for(let i=0; i<7; i++){
        let rating = 0;
        entries.map(entry => {
            if(entry.weekDay === weekNames[i]){
                rating = parseInt(entry.clientInformation);
                total += rating;
                count++;
            }
        })
        html += `
                 <div>${weekNames[i]}: ${rating}</div>
                 <hr>`
    }

    document.querySelector("#sleep-average").innerHTML = (total / count).toFixed(1);

    id.innerHTML = html;
}

function renderFatigue(){
    let id = document.querySelector("#fatigue-days"),
        html=``,
        weekNames = getWeekdayNames(),
        oneWeekAgo = new Date(),
        total = 0,
        count = 0;

        let entries =[];

    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    let weekOldFatigue = fatigueArr.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= oneWeekAgo;
    });

    weekOldFatigue.map(obj => {
        let {date, clientInformation, id, type} = obj,
            weekDay = getDayOfWeek( date );
        entries.push({ weekDay, clientInformation, id, type} );
    });

    for(let i=0; i<7; i++){
        let rating = 0;
        entries.map(entry => {
            if(entry.weekDay === weekNames[i]){
                rating = parseInt(entry.clientInformation);
                total += rating;
                count++;
            }
        })

        // if(entries.includes(weekNames[i])){
        //     console.log("The index is: " + fatigueArr.indexOf(weekNames[i]))
        // }
        html += `
                <div>${weekNames[i]}: ${rating}</div>
                <hr>`
    }
    document.querySelector("#fatigue-average").innerHTML = (total / count).toFixed(1);
    id.innerHTML = html;
}

// Body Fat %
let chartBF , modalBF;
function bodyFatChart() {
    let bodyFat = [], weighInDate = [];
    // chartBF.destroy();
    // modalBF.destroy();
    bodyFatPercentArr.map(data => {
        bodyFat.unshift(parseInt(data.clientInformation));
        weighInDate.unshift(data.date);
    })
    chartBF = populateGraph("bodyFatChart", weighInDate, bodyFat, "Body Fat %");
    modalBF = populateGraph("bodyFatModal", weighInDate, bodyFat, "Body Fat %");
}

// Body Weight
let chartBW, modalBW
function bodyWeightChart() {
    let bodyWeight = [], bodyweightInDate = [];
    bodyWeightArr.map(data => {
        bodyWeight.unshift( parseInt( data.clientInformation ) );
        bodyweightInDate.unshift( data.date );
    })
    chartBW = populateGraph("bodyWeightChart", bodyweightInDate, bodyWeight, "Body Weight");
    modalBW = populateGraph("bodyWeightModal", bodyweightInDate, bodyWeight, "Body Weight");
}

// Squat
let chartS, modalS;
function squatChart() {
    let squatWeight = [], squatDate = [];
    squatArr.map(data => {
        squatWeight.unshift( parseInt( data.clientInformation ) );
        squatDate.unshift( data.date );
    })
    chartS = populateGraph("squatChart", squatDate, squatWeight, "Squat Weight");
    modalS = populateGraph("squatModal", squatDate, squatWeight, "Squat Weight");
}

// BenchChart
let chartB, modalB;
function benchChart() {
    let benchWeight = [], benchDate = [];
    benchArr.map(data => {
        benchWeight.unshift( parseInt( data.clientInformation ) );
        benchDate.unshift( data.date );
    })
    chartB = populateGraph('benchChart', benchDate, benchWeight, 'Bench');
    modalB = populateGraph('benchModal', benchDate, benchWeight, 'Bench');
}

// deadLift chart
let chartDL, modalDL;
function deadLiftChart() {
    let deadLift = [], liftDate = [];
    deadliftArr.map(data => {
        deadLift.unshift( parseInt( data.clientInformation ) );
        liftDate.unshift( data.date );
    })
    chartDL = populateGraph('deadLiftChart', liftDate, deadLift, 'Deadlift');
    modalDL = populateGraph('deadliftModal', liftDate, deadLift, 'Deadlift');
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
//Simplify

async function setAllArr(){
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

}

function popAll(){
    renderSleep();
    renderFatigue();
    benchChart();
    bodyFatChart();
    bodyWeightChart();
    squatChart();
    deadLiftChart();
}

async function addInfo( info, date, type){
    let clientInformation = {
        clientInformation: info,
        date: addOneDay(date),
        type: type
    };
    await touchApi(clientInformation);

}

async function editInfo(id, info, date, type){
    let detailId = parseInt(id),
        clientInfo = {
        id: detailId,
        clientInformation: info,
        date: addOneDay(date),
        type: type
    };
    (info !== '0')? await touchApi(clientInfo): await deleteInfo(id);
}

async function deleteInfo(infoId) {
    const csrfToken = document.querySelector('meta[name="_csrf"]').content,
        csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;
    let id = document.querySelector('meta[name="view"]').content;

    await fetch(`/api/user/${id}/details/${infoId}`, {
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
    // resetAll();
    // graphInfo();
}

//This is for editing or adding
async function touchApi( clientInformation) {
    //date format: "2023-01-01" && type is spelt out
    let id = document.querySelector('meta[name="view"]').content;
    const csrfToken = document.querySelector('meta[name="_csrf"]').content;
    const csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;
    await fetch('/api/user/' + id + '/details', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            [csrfHeader]: csrfToken
        },
        body: JSON.stringify(clientInformation)
    })
        .then(response => response.json())
        // .then(data => console.log(data))
        .catch(error => console.error(error));
    // await resetAll();
    // await graphInfo();
}

function addOneDay(newDate) {
    var dateObj = new Date(newDate + 'T00:00:00Z');
    dateObj.setUTCDate(dateObj.getUTCDate() + 1);
    var year = dateObj.getUTCFullYear();
    var month = ('0' + (dateObj.getUTCMonth() + 1)).slice(-2);
    var day = ('0' + dateObj.getUTCDate()).slice(-2);
    return year + '-' + month + '-' + day;
}

function getDayOfWeek(dateString) {
     let daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
         date = new Date(dateString),
         dayOfWeekIndex = date.getDay(),
         dayOfWeek = daysOfWeek[dayOfWeekIndex];
    return dayOfWeek;
}

function getWeekdayNames(){
    const today = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayIndex = today.getDay();
    const lastWeekDays = [];

    for (let i = todayIndex; i >= todayIndex - 6; i--) {
        const index = i < 0 ? i + 7 : i;
        lastWeekDays.push(daysOfWeek[index]);
    }

    return lastWeekDays;
}

async function resetAll(){
    workoutPlanArr = [];
    bodyWeightArr = [];
    bodyFatPercentArr = [];
    squatArr = [];
    benchArr = [];
    deadliftArr = [];
    sleepArr = [];
    fatigueArr = [];


    chartBW.destroy();
    modalBW.destroy();
    chartS.destroy();
    modalS.destroy();
    chartB.destroy();
    modalB.destroy();
    chartDL.destroy();
    modalDL.destroy();
}
