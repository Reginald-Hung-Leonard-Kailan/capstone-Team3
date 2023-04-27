
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
    // console.log("Date:", dateInput);
    // console.log("Value:", valueInput);

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
    await allInfo();
    console.log(sleepArr);
    await renderSleep();
}

//fatigue

//etc.

