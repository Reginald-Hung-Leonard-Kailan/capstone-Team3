
//checking for the fields are not incomplete
//Sleep
function saveChangesSleep() {
    // Get the date and value inputs
    const dateInput = document.getElementById("sleep-date"),
        valueInput = document.getElementById("sleep-rating"),
     modal = document.getElementById('sleepModal');

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
    console.log("Date:", dateInput.value);
    console.log("Value:", valueInput.value);

    //close the mod
    const modalBS = bootstrap.Modal.getInstance(modal);
    modalBS.hide();
}

//fatigue

//etc.


// Get the element with the id "edit-sleep" this shows the model
// const editSleep = document.getElementById('edit-sleep');
// editSleep.addEventListener('click', function() {
//     alert("I was clicked");
// });

//old code
const sleepModal = document.querySelector('#sleep-modal');
const editSleep = document.querySelector('#edit-sleep');
const closeSleep = document.querySelector('#close-sleep');

editSleep.addEventListener('click',()=>{
    sleepModal.showModal();
})
closeSleep.addEventListener('click',()=>{
    sleepModal.close();
})

//This is for the newDate and newInfo btn
//                <a id="edit-sleep" class="align-middle" data-bs-toggle="modal" data-bs-target="#sleepModal"><i class="align-middle" data-feather="edit-3"></i></a>