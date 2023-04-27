
//checking for the fields are not incomplete

//Sleep
async function saveChangesSleep() {
    // Get the date and value inputs
    let dateInput = document.getElementById("sleep-date"),
        valueInput = document.getElementById("sleep-rating"),
        modal = document.getElementById('sleepModal'),
        findIndex;

    // Validate the date input
    if (!dateInput.value) {
        alert("Please select a date.");
        return;
    }

    // Validate the value input
    const value = parseInt(valueInput.value);
    if (isNaN(value) || value < 0 || value > 5) {
        alert("Please select a value between 0 and 5.");
        return;
    }


    // Log the date and value
    dateInput = dateInput.value;
    valueInput = valueInput.value;

    //close the modal
    const modalBS = bootstrap.Modal.getInstance(modal);
    modalBS.hide();

    //save/edit/delete in db
    findIndex = sleepArr.findIndex(obj => obj.date === dateInput);
    if( findIndex === -1) {
        await addInfo(valueInput, dateInput, "sleep");
    } else {
        let id = sleepArr[findIndex].id;
        await editInfo(id, valueInput, dateInput, "sleep");
    }
    sleepArr = [];
    await allInfo();
    await renderSleep();
}

//fatigue
async function saveChangesFatigue() {
    // Get the date and value inputs
    let dateInput = document.getElementById("fatigue-date"),
        valueInput = document.getElementById("fatigue-rating"),
        modal = document.getElementById('fatigueModal'),
        findIndex;

    // Validate the date input
    if (!dateInput.value) {
        alert("Please select a date.");
        return;
    }

    // Validate the value input
    const value = parseInt(valueInput.value);
    if (isNaN(value) || value < 0 || value > 5) {
        alert("Please select a value between 0 and 5.");
        return;
    }


    // Log the date and value
    dateInput = dateInput.value;
    valueInput = valueInput.value;
    // console.log("Date:", dateInput);
    // console.log("Value:", valueInput);

    //close the modal
    const modalBS = bootstrap.Modal.getInstance(modal);
    modalBS.hide();

    //save/edit/delete in db
    findIndex = fatigueArr.findIndex(obj => obj.date === dateInput);
    if( findIndex === -1) {
        await addInfo(valueInput, dateInput, "fatigue");
    } else {
        let id = fatigueArr[findIndex].id;
        await editInfo(id, valueInput, dateInput, "fatigue");
    }
    fatigueArr = [];
    chartFatigue.destroy();
    await allInfo();
    fatigueCalendar(fatigueArr);
    console.log(fatigueArr);
}

//bodyfat
async function saveChangesBodyfat() {
    // Get the date and value inputs
    let dateInput = document.getElementById("bodyfat-date"),
        valueInput = document.getElementById("bodyfat-rating"),
        modal = document.getElementById('bodyfatModal'),
        findIndex;

    // Validate the date input
    if (!dateInput.value) {
        alert("Please select a date.");
        return;
    }

    // Validate the value input
    const value = parseInt(valueInput.value);
    if (isNaN(value) || value < 0 || value > 60) {
        alert("Please select a value between 0 and 60.");
        return;
    }


    // Log the date and value
    dateInput = dateInput.value;
    valueInput = valueInput.value;

    //close the modal
    const modalBS = bootstrap.Modal.getInstance(modal);
    modalBS.hide();

    //save/edit/delete in db
    findIndex = bodyFatPercentArr.findIndex(obj => obj.date === dateInput);
    if( findIndex === -1) {
        await addInfo(valueInput, dateInput, "bodyFatPercent");
    } else {
        let id = bodyFatPercentArr[findIndex].id;
        await editInfo(id, valueInput, dateInput, "bodyFatPercent");
    }
    bodyFatPercentArr = [];
    chartBF.destroy();
    await allInfo();
    bodyFatChart();
}

//bodyweight
async function saveChangesBodyweight() {
    // Get the date and value inputs
    let dateInput = document.getElementById("bodyweight-date"),
        valueInput = document.getElementById("bodyweight-rating"),
        modal = document.getElementById('bodyweightModal'),
        findIndex;

    // Validate the date input
    if (!dateInput.value) {
        alert("Please select a date.");
        return;
    }

    // Validate the value input
    const value = parseInt(valueInput.value);
    if (isNaN(value) || value < 0 || value > 400) {
        alert("Please select a value between 0 and 400.");
        return;
    }


    // Log the date and value
    dateInput = dateInput.value;
    valueInput = valueInput.value;

    //close the modal
    const modalBS = bootstrap.Modal.getInstance(modal);
    modalBS.hide();

    //save/edit/delete in db
    findIndex = bodyWeightArr.findIndex(obj => obj.date === dateInput);
    if( findIndex === -1) {
        await addInfo(valueInput, dateInput, "bodyWeight");
    } else {
        let id = bodyWeightArr[findIndex].id;
        await editInfo(id, valueInput, dateInput, "bodyWeight");
    }
    bodyWeightArr = [];
    chartBW.destroy();
    await allInfo();
    bodyWeightChart();
}

//squat
async function saveChangesSquat() {
    // Get the date and value inputs
    let dateInput = document.getElementById("squat-date"),
        valueInput = document.getElementById("squat-rating"),
        modal = document.getElementById('squatModal'),
        findIndex;

    // Validate the date input
    if (!dateInput.value) {
        alert("Please select a date.");
        return;
    }

    // Validate the value input
    const value = parseInt(valueInput.value);
    if (isNaN(value) || value < 0 || value > 1200) {
        alert("Please select a value between 0 and 1200.");
        return;
    }


    // Log the date and value
    dateInput = dateInput.value;
    valueInput = valueInput.value;

    //close the modal
    const modalBS = bootstrap.Modal.getInstance(modal);
    modalBS.hide();

    //save/edit/delete in db
    findIndex = squatArr.findIndex(obj => obj.date === dateInput);
    if( findIndex === -1) {
        await addInfo(valueInput, dateInput, "squat");
    } else {
        let id = squatArr[findIndex].id;
        await editInfo(id, valueInput, dateInput, "squat");
    }
    squatArr = [];
    chartS.destroy();
    await allInfo();
    squatChart();
}

//bench
async function saveChangesBench() {
    // Get the date and value inputs
    let dateInput = document.getElementById("bench-date"),
        valueInput = document.getElementById("bench-rating"),
        modal = document.getElementById('benchModal'),
        findIndex;

    // Validate the date input
    if (!dateInput.value) {
        alert("Please select a date.");
        return;
    }

    // Validate the value input
    const value = parseInt(valueInput.value);
    if (isNaN(value) || value < 0 || value > 900) {
        alert("Please select a value between 0 and 900.");
        return;
    }


    // Log the date and value
    dateInput = dateInput.value;
    valueInput = valueInput.value;

    //close the modal
    const modalBS = bootstrap.Modal.getInstance(modal);
    modalBS.hide();

    //save/edit/delete in db
    findIndex = benchArr.findIndex(obj => obj.date === dateInput);
    if( findIndex === -1) {
        await addInfo(valueInput, dateInput, "bench");
    } else {
        let id = benchArr[findIndex].id;
        await editInfo(id, valueInput, dateInput, "bench");
    }
    benchArr = [];
    chartB.destroy();
    await allInfo();
    benchChart();
}

//deadlift
async function saveChangesDeadlift() {
    // Get the date and value inputs
    let dateInput = document.getElementById("deadlift-date"),
        valueInput = document.getElementById("deadlift-rating"),
        modal = document.getElementById('deadliftModal'),
        findIndex;

    // Validate the date input
    if (!dateInput.value) {
        alert("Please select a date.");
        return;
    }

    // Validate the value input
    const value = parseInt(valueInput.value);
    if (isNaN(value) || value < 0 || value > 1500) {
        alert("Please select a value between 0 and 1500.");
        return;
    }


    // Log the date and value
    dateInput = dateInput.value;
    valueInput = valueInput.value;

    //close the modal
    const modalBS = bootstrap.Modal.getInstance(modal);
    modalBS.hide();

    //save/edit/delete in db
    findIndex = deadliftArr.findIndex(obj => obj.date === dateInput);
    if( findIndex === -1) {
        await addInfo(valueInput, dateInput, "deadlift");
    } else {
        let id = deadliftArr[findIndex].id;
        await editInfo(id, valueInput, dateInput, "deadlift");
    }
    deadliftArr = [];
    chartDL.destroy();
    await allInfo();
    deadliftChart();
}

//workout program
async function addProgram(){
    // Get the date and value inputs
    let dateInput = document.getElementById("program-date"),
        valueInput = document.getElementById("program-url"),
        modal = document.getElementById('programModal'),
        findIndex;

    //Validate date
    if (!dateInput.value) {
        alert("Please select a date.");
        return;
    }

    // Validate the value input
    const value = valueInput.value;
    if (value.length < 10) {
        alert("Don't forget the https://www. in front of the url!");
        return;
    }

    // save the date and value
    dateInput = dateInput.value;
    valueInput = valueInput.value;
    await addInfo(valueInput, dateInput, "workoutPlan");

    //close the modal
    const modalBS = bootstrap.Modal.getInstance(modal);
    modalBS.hide();

    workoutPlanArr = [];
    await allInfo();
    await renderProgram();
}