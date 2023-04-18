

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
        let sleep=sleepArr[i];
        html += `
        <div>${sleep.date +':'+ sleep.clientInformation}</div>
      <hr>
    `
    }

    id.innerHTML = html;
}
function renderFatigue(fatigueArr){
    let id = document.querySelector("#edit-fatigue"), html=``;

    for(let i=0; i<fatigueArr.length; i++){
        let fatigue=fatigueArr[i];
        html += `
        <div>${fatigue.date +':'+ fatigue.clientInformation}</div>
      <hr>
    `
    }

    id.innerHTML = html;
}
// Body Fat %

function bodyFatChart() {
    const ctx = document.getElementById('bodyFatChart').getContext('2d');
    const ctx1 = document.getElementById('bodyFatChart1').getContext('2d');

// this is the data how it should appear from the database when populating
    let bodyFat = [];
    let weighInDate = [];
    bodyFatPercentArr.map(data => {
        bodyFat.unshift( parseInt( data.clientInformation ) );
        weighInDate.unshift( data.date );
    })

    const data = {
        labels: weighInDate,
        datasets: [{
            label: 'Body Fat %',
            data: bodyFat,
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

// eslint-disable-next-line no-undef,no-unused-vars
    const myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
    const myChart1 = new Chart(ctx1, {
        type: 'line',
        data: data,
        options: options
    });
}

// Body Weight %

function bodyWeightChart() {
    const ctx = document.getElementById('bodyWeightChart').getContext('2d');

// this is the data how it should appear from the database when populating
    let bodyWeight = [];
    let bodyweightInDate = [];
    bodyWeightArr.map(data => {
        bodyWeight.unshift( parseInt( data.clientInformation ) );
        bodyweightInDate.unshift( data.date );
    })

    const data = {
        labels: bodyweightInDate,
        datasets: [{
            label: 'Body Weight',
            data: bodyWeight,
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

// eslint-disable-next-line no-undef,no-unused-vars
    const myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}

// Squat

function squatChart() {
    const ctx = document.getElementById('squatChart').getContext('2d');

// this is the data how it should appear from the database when populating
    let squatWeight = [];
    let squatDate = [];
    squatArr.map(data => {
        squatWeight.unshift( parseInt( data.clientInformation ) );
        squatDate.unshift( data.date );
    })

    const data = {
        labels: squatDate,
        datasets: [{
            label: 'Squat Weight',
            data: squatWeight,
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

// eslint-disable-next-line no-undef,no-unused-vars
    const myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}


// BenchChart

function benchChart() {
    const ctx = document.getElementById('benchChart').getContext('2d');

// this is the data how it should appear from the database when populating
    let benchWeight = [];
    let benchDate = [];
    benchArr.map(data => {
        benchWeight.unshift( parseInt( data.clientInformation ) );
        benchDate.unshift( data.date );
    })

    const data = {
        labels: benchDate,
        datasets: [{
            label: 'bench',
            data: benchWeight,
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

// eslint-disable-next-line no-undef,no-unused-vars
    const myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}
// Body Fat %

function deadLiftChart() {
    const ctx = document.getElementById('deadLiftChart').getContext('2d');

// this is the data how it should appear from the database when populating
    let deadLift = [];
    let liftDate = [];
    deadliftArr.map(data => {
        deadLift.unshift( parseInt( data.clientInformation ) );
        liftDate.unshift( data.date );
    })

    const data = {
        labels: liftDate,
        datasets: [{
            label: 'Dead Lift',
            data: deadLift,
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

// eslint-disable-next-line no-undef,no-unused-vars
    const myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}


async function graphInfo(){
    let id = document.querySelector('meta[name="view"]').content;
    let url = "/api/user/" + id + '/details';
    let personalStats = await fetch(url).then(response => response.json())
                                .then(data => {
                                    // console.log(data);
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
    console.log(fatigueArr);
    renderSleep(sleepArr);
    renderFatigue(fatigueArr);
    benchChart();
    bodyFatChart();
    bodyWeightChart();
    squatChart();
    deadLiftChart();
}

function addinfo(userId, discription, date, type) {
    //date format: "2023-01-01" && type is spelt out
    var clientInformation = {
        clientInformation: discription,
        date: date,
        type: type
    };
    const csrfToken = document.querySelector('meta[name="_csrf"]').content;
    const csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;
    fetch('/api/user/' + userId + '/details', {
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
}


