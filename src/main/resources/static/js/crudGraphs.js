const addBodyFatBtn = document.getElementById('add-body-fat');
addBodyFatBtn.addEventListener('click',async ()=>{
    if(validateForm(0, 60)) {let newDate = document.getElementById('body-fat-date').value,
        newInfo = document.getElementById('body-fat-info').value,
        findIndex = bodyFatPercentArr.findIndex(obj => obj.date === newDate);

        if (findIndex === -1) {
            await addInfo(newInfo, newDate, 'bodyFatPercent');
        } else {
            const {id, type} = bodyFatPercentArr[findIndex];
            await editInfo(id, newInfo, newDate, type);
        }
        bodyFatPercentArr = [];
        await setAllArr();
        await chartBF.destroy();
        await modalBF.destroy();
        await bodyFatChart();
    }
});

const addBodyWeightBtn = document.getElementById('add-body-weight');
addBodyWeightBtn.addEventListener('click',async ()=>{
    if( validateForm(0, 500, "body-weight-info") ) {
        let newDate = document.getElementById('body-weight-date').value,
            newInfo = document.getElementById('body-weight-info').value,
            findIndex = bodyWeightArr.findIndex(obj => obj.date === newDate);

        if (findIndex === -1) {
            await addInfo(newInfo, newDate, 'bodyWeight');
        } else {
            const {id, clientInformation, date, type} = bodyWeightArr[findIndex];
            await editInfo(id, newInfo, newDate, type);
        }
        bodyWeightArr = [];
        await setAllArr();
        await chartBW.destroy();
        await modalBW.destroy();
        await bodyWeightChart();
    }
});

const addSquatBtn = document.getElementById('add-squat');
addSquatBtn.addEventListener('click',async ()=>{
    if(validateForm(0, 1200, 'squat-info')) {
        let newDate = document.getElementById('squat-date').value,
            newInfo = document.getElementById('squat-info').value,
            findIndex = squatArr.findIndex(obj => obj.date === newDate);

        if (findIndex === -1) {
            await addInfo(newInfo, newDate, 'squat');
        } else {
            const {id, clientInformation, date, type} = squatArr[findIndex];
            await editInfo(id, newInfo, newDate, type);
        }
        squatArr = [];
        await setAllArr();
        await chartS.destroy();
        await modalS.destroy();
        await squatChart();
    }
});

const addBenchBtn = document.getElementById('add-bench');
addBenchBtn.addEventListener('click',async ()=>{
    if(validateForm(0, 900, "bench-info")) {
        let newDate = document.getElementById('bench-date').value,
            newInfo = document.getElementById('bench-info').value,
            findIndex = benchArr.findIndex(obj => obj.date === newDate);

        if (findIndex === -1) {
            await addInfo(newInfo, newDate, 'bench');
        } else {
            const {id, clientInformation, date, type} = benchArr[findIndex];
            await editInfo(id, newInfo, newDate, type);
        }
        benchArr = [];
        await setAllArr();
        await chartB.destroy();
        await modalB.destroy();
        await benchChart();
    }
});

const addDeadliftBtn = document.getElementById('add-deadlift');
addDeadliftBtn.addEventListener('click',async ()=>{
    if(validateForm(0, 1300, "deadlift-info")) {
        let newDate = document.getElementById('deadlift-date').value,
            newInfo = document.getElementById('deadlift-info').value,
            findIndex = deadliftArr.findIndex(obj => obj.date === newDate);

        if (findIndex === -1) {
            await addInfo(newInfo, newDate, 'deadlift');
        } else {
            const {id, clientInformation, date, type} = deadliftArr[findIndex];
            await editInfo(id, newInfo, newDate, type);
        }
        deadliftArr = [];
        await setAllArr();
        await chartDL.destroy();
        await modalDL.destroy();
        await deadLiftChart();
    }
});

const addFatigueBtn = document.getElementById("add-fatigue");
addFatigueBtn.addEventListener('click', async ()=>{
    let newDate = document.getElementById('fatigue-date').value,
        newInfo = document.getElementById('fatigue-rating').value,
        date = todayRightFormat(newDate),
        findIndex;

    findIndex = fatigueArr.findIndex(obj => obj.date === date);
    if( findIndex === -1) {
        await addInfo(newInfo, date, "fatigue");
    } else {
        let id = fatigueArr[findIndex].id;
        await editInfo(id, newInfo, date, "fatigue");
    }
    fatigueArr = [];
    await setAllArr();
    await renderFatigue();
})

const addSleepBtn = document.getElementById("add-sleep");
addSleepBtn.addEventListener('click', async () => {
    let newDate = document.getElementById('sleep-date').value,
        newInfo = document.getElementById('sleep-rating').value,
        date = todayRightFormat(newDate),
        findIndex;

    findIndex = sleepArr.findIndex(obj => obj.date === date);
    if( findIndex === -1) {
        await addInfo(newInfo, date, "sleep");
    } else {
        let id = sleepArr[findIndex].id;
        await editInfo(id, newInfo, date, "sleep");
    }
    sleepArr = [];
    await setAllArr();
    await renderSleep();
})

function todayRightFormat(newDate = 0){
    let currentDate = new Date(), helper = [];
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
    return helper
}

function validateForm(min, max, idName = "body-fat-info") {
    let bodyFatInput = document.getElementById(idName);
    return !(bodyFatInput.value < min || bodyFatInput.value > max);
}