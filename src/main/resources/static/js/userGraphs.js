

//Fatigue Calendar
let chartFatigue; //for CRUD do .destory() on this and then run function again
function fatigueCalendar(data = fatigueArr){
    let formatData = [];

    fatigueArr.map(obj => {
        let rating = parseInt(obj.clientInformation);
        let date = dateToMMDDYYYY(obj.date);
        formatData.push([date, rating])
    });

    helper = formatData;
    console.log(formatData);

    chartFatigue = JSC.chart('fatigue-calendar', {
        debug: true,
        type: 'calendar month solid',
        data: formatData,
        legend: {
            title_label: {
                text: '<b>Select Month</b>',
                align: 'right',
                style: {fontSize: '15px'}
            },
            defaultEntry: {
                style: {fontSize: '13px'},
                states_hidden_color: '#a5a5a5'
            }
        },
        palette: {
            colors: ['#d73027', '#F40000', '#FDAE61', '#FEF600', '#9FEF00', '#00B00C'],
            colorBar_axis: {scale_interval: 5}
        },
        calendar: {
            defaultEdgePoint: {mouseTracking: false, label_visible: false},
            defaultEmptyPoint: {
                outline_width: 0,
                hatch: {style: 'none'},
                opacity: 0.5,
                legendEntry_visible: false
            }
        },
        title: {
            label: {
                text: 'Ratings by Day',
                style_fontSize: 15
            }
        },
        yAxis_visible: false,
        defaultPoint: {
            opacity: 0.00001,
            focusGlow: false,
            label: {
                color: '#424242',
                verticalAlign: 'top',
                text: function(p) {
                    return makeLabels(p);
                }
            },
            outline_width: 0,
            tooltip: '<b>{%date:date D}</b><br> Fatigue rating is: %zValue'
        },
        defaultSeries_shape_innerPadding: 0.04,
        toolbar_visible: false
    });

    function makeLabels(p) {
        var salesGoal = 5;

        // The circle circular gauge is created with a pie with two points, one with a color and a gray one. On top a circle icon to clip the middle, and a centered label on top of that. The <absolute> tag allows stacking items this way.

        if (p.replaceTokens('%zValue') < salesGoal) {
            return (
                '<span style="align:right; color:#757575; font-size:11px">%name</span><br>' +
                '<absolute><chart pie data=' +
                p.replaceTokens('%zValue') +
                ',' +
                (salesGoal - p.replaceTokens('%zValue')) +
                ' size=42 colors=,' +
                p.replaceTokens('%color') +
                ',#F5F5F5 align=center verticalAlign=middle>' +
                '<icon name=system/default/circle size=30 color=white margin_left=10 align=center verticalAlign=middle><span style="width:50px; align:center;"><b>%zValue</b></span></absolute>'
            );
        }
        return (
            '<span style="align:right; color:#757575; font-size:11px">%name</span><br>' +
            '<absolute><chart pie data=' +
            p.replaceTokens('%zValue') +
            ',1 size=42 colors=,' +
            p.replaceTokens('%color') +
            ',' +
            p.replaceTokens('%color') +
            ' align=center verticalAlign=middle>' +
            '<icon name=system/default/circle size=30 color=white margin_left=10 align=center verticalAlign=middle><span style="width:50px; align:center;"><b>%zValue</b></span></absolute>'
        );

    }
}


// Body Fat %
let chartBF;
function bodyFatChart() {
    let bodyFat = [], weighInDate = [];
    // chartBF.destroy();
    // modalBF.destroy();
    bodyFatPercentArr.map(data => {
        bodyFat.unshift(parseFloat(data.clientInformation).toFixed(2));
        weighInDate.unshift(data.date);
    })
    chartBF = populateGraph("bodyFatChart", weighInDate, bodyFat, "Body Fat %");
    // modalBF = populateGraph("bodyFatModal", weighInDate, bodyFat, "Body Fat %");
}

// Body Weight
let chartBW;
function bodyWeightChart() {
    let bodyWeight = [], bodyweightInDate = [];
    bodyWeightArr.map(data => {
        bodyWeight.unshift( parseInt( data.clientInformation ) );
        bodyweightInDate.unshift( data.date );
    })
    chartBW = populateGraph("bodyWeightChart", bodyweightInDate, bodyWeight, "Body Weight");
    // modalBW = populateGraph("bodyWeightModal", bodyweightInDate, bodyWeight, "Body Weight");
}

// Squat
let chartS;
function squatChart() {
    let squatWeight = [], squatDate = [];
    squatArr.map(data => {
        squatWeight.unshift( parseInt( data.clientInformation ) );
        squatDate.unshift( data.date );
    })
    chartS = populateGraph("squatChart", squatDate, squatWeight, "Squat Weight");
    // modalS = populateGraph("squatModal", squatDate, squatWeight, "Squat Weight");
}

// BenchChart
let chartB;
function benchChart() {
    let benchWeight = [], benchDate = [];
    benchArr.map(data => {
        benchWeight.unshift( parseInt( data.clientInformation ) );
        benchDate.unshift( data.date );
    })
    chartB = populateGraph('benchChart', benchDate, benchWeight, 'Bench');
    // modalB = populateGraph('benchModal', benchDate, benchWeight, 'Bench');
}

// deadLift chart
let chartDL;
function deadliftChart() {
    let deadLift = [], liftDate = [];
    deadliftArr.map(data => {
        deadLift.unshift( parseInt( data.clientInformation ) );
        liftDate.unshift( data.date );
    })
    chartDL = populateGraph('deadliftChart', liftDate, deadLift, 'Deadlift');
    // modalDL = populateGraph('deadliftModal', liftDate, deadLift, 'Deadlift');
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
//Simplify


function popAll(){
    renderSleep();
    // renderFatigue();
    benchChart();
    bodyFatChart();
    bodyWeightChart();
    squatChart();
    deadliftChart();
    // fatigueCalendar()
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

function dateToMMDDYYYY(oldFormat){
    let dateArr = oldFormat.split('-')
    let correctArr = [dateArr[1], dateArr[2], dateArr[0]];
    return correctArr.join('/')
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

    chartBF.destroy();
    modalBF.destroy();
    chartBW.destroy();
    modalBW.destroy();
    chartS.destroy();
    modalS.destroy();
    chartB.destroy();
    modalB.destroy();
    chartDL.destroy();
    modalDL.destroy();
}
