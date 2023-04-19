const addBodyFatBtn = document.getElementById('add-body-fat');
addBodyFatBtn.addEventListener('click',async ()=>{
    let newDate = document.getElementById('body-fat-date').value,
        newInfo = document.getElementById('body-fat-info').value,
        findIndex = bodyFatPercentArr.findIndex(obj => obj.date === newDate);

    if (findIndex === -1) {
        await addInfo(newInfo, newDate, 'bodyFatPercent');
        // location.href = location.href;
    } else {
        const {id, clientInformation, date, type} = bodyFatPercentArr[findIndex];
        await editInfo(id, newInfo, newDate, type);
    }
    bodyFatPercentArr = [];
    await setAllArr();
    await chartBF.destroy();
    await modalBF.destroy();
    await bodyFatChart();
});

const addBodyWeightBtn = document.getElementById('add-body-weight');
addBodyWeightBtn.addEventListener('click',async ()=>{
    let newDate = document.getElementById('body-weight-date').value,
        newInfo = document.getElementById('body-weight-info').value,
        findIndex = bodyWeightArr.findIndex(obj => obj.date === newDate);

    if (findIndex === -1) {
       await addInfo(newInfo, newDate, 'bodyWeight');
        // location.href = location.href;
    } else {
        const {id, clientInformation, date, type} = bodyWeightArr[findIndex];
        await editInfo(id, newInfo, newDate, type);
    }
    bodyWeightArr = [];
    await setAllArr();
    await chartBW.destroy();
    await modalBW.destroy();
    await bodyWeightChart();
});

const addSquatBtn = document.getElementById('add-squat');
addSquatBtn.addEventListener('click',async ()=>{
    let newDate = document.getElementById('squat-date').value,
        newInfo = document.getElementById('squat-info').value,
        findIndex = squatArr.findIndex(obj => obj.date === newDate);

    if (findIndex === -1) {
        await addInfo(newInfo, newDate, 'squat');
        // location.href = location.href;
    } else {
        const {id, clientInformation, date, type} = squatArr[findIndex];
        await editInfo(id, newInfo, newDate, type);
    }
    squatArr = [];
    await setAllArr();
    await chartS.destroy();
    await modalS.destroy();
    await squatChart();
});

const addBenchBtn = document.getElementById('add-bench');
addBenchBtn.addEventListener('click',async ()=>{
    let newDate = document.getElementById('bench-date').value,
        newInfo = document.getElementById('bench-info').value,
        findIndex = benchArr.findIndex(obj => obj.date === newDate);

    if (findIndex === -1) {
        await addInfo(newInfo, newDate, 'bench');
        // location.href = location.href;
    } else {
        const {id, clientInformation, date, type} = benchArr[findIndex];
        await editInfo(id, newInfo, newDate, type);
    }
    benchArr = [];
    await setAllArr();
    await chartB.destroy();
    await modalB.destroy();
    await benchChart();
});

const addDeadliftBtn = document.getElementById('add-deadlift');
addDeadliftBtn.addEventListener('click',async ()=>{
    let newDate = document.getElementById('deadlift-date').value,
        newInfo = document.getElementById('deadlift-info').value,
        findIndex = deadliftArr.findIndex(obj => obj.date === newDate);

    if (findIndex === -1) {
        await addInfo(newInfo, newDate, 'deadlift');
        // location.href = location.href;
    } else {
        const {id, clientInformation, date, type} = deadliftArr[findIndex];
        await editInfo(id, newInfo, newDate, type);
    }
    deadliftArr = [];
    await setAllArr();
    await chartDL.destroy();
    await modalDL.destroy();
    await deadLiftChart();
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
    // resetAll();
    // graphInfo();
})

const addSleepBtn = document.getElementById("add-sleep");
addSleepBtn.addEventListener('click', async () => {
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
        await addInfo(newInfo, helper, "sleep");
    } else {
        let id = sleepArr[findIndex].id;
        await editInfo(id, newInfo, helper, "sleep");
    }
    sleepArr
})


