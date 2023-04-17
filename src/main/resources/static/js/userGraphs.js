

let workoutPlanArr = [],
    bodyWeightArr = [],
    bodyFatPercentArr = [],
    squatArr = [],
    benchArr = [],
    deadliftArr = [],
    sleepArr = [],
    fatigueArr = [];

// Body Fat %

function bodyFatChart() {
    const ctx = document.getElementById('bodyFatChart').getContext('2d');

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
    // console.log(benchArr);
    benchChart();
    bodyFatChart();
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