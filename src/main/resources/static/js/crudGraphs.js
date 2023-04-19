const addBodyFatBtn = document.getElementById('add-body-fat');
addBodyFatBtn.addEventListener('click',()=>{
    let newDate = document.getElementById('body-fat-date').value,
        newInfo = document.getElementById('body-fat-info').value,
        findIndex = bodyFatPercentArr.findIndex(obj => obj.date === newDate);

    if (findIndex === -1) {
        addInfo(newInfo, newDate, 'bodyFatPercent');
        // location.href = location.href;
    } else {
        const {id, clientInformation, date, type} = bodyFatPercentArr[findIndex];
        editInfo(id, newInfo, newDate, type);
    }
});

const addBodyWeightBtn = document.getElementById('add-body-weight');
addBodyWeightBtn.addEventListener('click',()=>{
    let newDate = document.getElementById('body-weight-date').value,
        newInfo = document.getElementById('body-weight-info').value,
        findIndex = bodyWeightArr.findIndex(obj => obj.date === newDate);

    if (findIndex === -1) {
        addInfo(newInfo, newDate, 'bodyWeight');
        // location.href = location.href;
    } else {
        const {id, clientInformation, date, type} = bodyWeightArr[findIndex];
        editInfo(id, newInfo, newDate, type);
    }
});

const addSquatBtn = document.getElementById('add-squat');
addSquatBtn.addEventListener('click',()=>{
    let newDate = document.getElementById('squat-date').value,
        newInfo = document.getElementById('squat-info').value,
        findIndex = squatArr.findIndex(obj => obj.date === newDate);

    if (findIndex === -1) {
        addInfo(newInfo, newDate, 'squat');
        // location.href = location.href;
    } else {
        const {id, clientInformation, date, type} = squatArr[findIndex];
        editInfo(id, newInfo, newDate, type);
    }
});

const addBenchBtn = document.getElementById('add-bench');
addBenchBtn.addEventListener('click',()=>{
    let newDate = document.getElementById('bench-date').value,
        newInfo = document.getElementById('bench-info').value,
        findIndex = benchArr.findIndex(obj => obj.date === newDate);

    if (findIndex === -1) {
        addInfo(newInfo, newDate, 'bench');
        // location.href = location.href;
    } else {
        const {id, clientInformation, date, type} = benchArr[findIndex];
        editInfo(id, newInfo, newDate, type);
    }
});

const addDeadliftBtn = document.getElementById('add-deadlift');
addDeadliftBtn.addEventListener('click',()=>{
    let newDate = document.getElementById('deadlift-date').value,
        newInfo = document.getElementById('deadlift-info').value,
        findIndex = deadliftArr.findIndex(obj => obj.date === newDate);

    if (findIndex === -1) {
        addInfo(newInfo, newDate, 'deadlift');
        // location.href = location.href;
    } else {
        const {id, clientInformation, date, type} = deadliftArr[findIndex];
        editInfo(id, newInfo, newDate, type);
    }
});

const addFatigueBtn = document.getElementById("add-fatigue");
addFatigueBtn.addEventListener('click', ()=>{
    let newDate = document.getElementById('fatigue-date').value,
        newInfo = document.getElementById('fatigue-rating').value;
    let currentDate = new Date(), helper = [],
        findIndex;
    currentDate.setDate(currentDate.getDate() - newDate)
    currentDate = currentDate.toLocaleDateString('en-US')
        .split("/");
    helper.push(currentDate[2]);
    if( currentDate[0].length < 2 ){
        currentDate[0] = '0' + currentDate[0];
    }
    helper.push(currentDate[0]);
    helper.push(currentDate[1]);
    helper = helper.join('-');

    findIndex = fatigueArr.findIndex(obj => obj.date === helper);
    if( findIndex === -1) {
        addInfo(newInfo, helper, "fatigue");
    } else {
        let id = fatigueArr[findIndex].id;
        editInfo(id, newInfo, helper, "fatigue");
    }
    resetAll();
    graphInfo();
})

const addSleepBtn = document.getElementById("add-sleep");
addSleepBtn.addEventListener('click', ()=>{
    let newDate = document.getElementById('sleep-date').value,
        newInfo = document.getElementById('sleep-rating').value;
    let currentDate = new Date(), helper = [],
        findIndex;
    currentDate.setDate(currentDate.getDate() - newDate)
    currentDate = currentDate.toLocaleDateString('en-US')
        .split("/");
    helper.push(currentDate[2]);
    if( currentDate[0].length < 2 ){
        currentDate[0] = '0' + currentDate[0];
    }
    helper.push(currentDate[0]);
    helper.push(currentDate[1]);
    helper = helper.join('-');

    findIndex = sleepArr.findIndex(obj => obj.date === helper);
    if( findIndex === -1) {
        addInfo(newInfo, helper, "sleep");
    } else {
        let id = sleepArr[findIndex].id;
        editInfo(id, newInfo, helper, "sleep");
    }
    resetAll();
    graphInfo();
})