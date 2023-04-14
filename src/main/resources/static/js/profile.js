
// Profile Tabs
function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
// Get the element with id="defaultOpen" and click on it
}

window.onload = function() {
    document.getElementById("defaultOpen").click()
};


//     Modals and Edit forms
const fatigueModal = document.querySelector('#fatigue-modal');
const editFatigue = document.querySelector('#edit-fatigue');
const closeFatigue = document.querySelector('#close-fatigue');

editFatigue.addEventListener('click',()=>{
    fatigueModal.showModal();
})
closeFatigue.addEventListener('click',()=>{
    fatigueModal.close();
})

const sleepModal = document.querySelector('#sleep-modal');
const editSleep = document.querySelector('#edit-sleep');
const closeSleep = document.querySelector('#close-sleep');

editSleep.addEventListener('click',()=>{
    sleepModal.showModal();
})
closeSleep.addEventListener('click',()=>{
    sleepModal.close();
})

const chartModal = document.querySelector('#chart-modal');
const viewChart = document.querySelector('#view-chart');
const closeChart = document.querySelector('#close-chart');

viewChart.addEventListener('click',()=>{
    chartModal.showModal();
})
closeChart.addEventListener('click',()=>{
    chartModal.close();
})

const editChartModal = document.querySelector('#edit-chart-modal');
const editChart = document.querySelector('#edit-chart');
const closeEditChart = document.querySelector('#close-edit-chart');

editChart.addEventListener('click',()=>{
    editChartModal.showModal();
})
closeEditChart.addEventListener('click',()=>{
    editChartModal.close();
})

const injuryModal = document.querySelector('#injury-modal');
const viewInjury = document.querySelector('#view-injury');
const closeInjury = document.querySelector('#close-injury');

viewInjury.addEventListener('click',()=>{
    injuryModal.showModal();
})
closeInjury.addEventListener('click',()=>{
    injuryModal.close();
})
//
// const editInjuryModal = document.querySelector('#edit-injury-modal');
// const editInjury = document.querySelector('#edit-injury');
// const closeEditInjury = document.querySelector('#close-edit-injury');
//
// editInjury.addEventListener('click',()=>{
//     editInjuryModal.showModal();
// })
// closeEditInjury.addEventListener('click',()=>{
//     editInjuryModal.close();
// })

const editProfileModal = document.querySelector('#edit-profile-modal');
const editProfile = document.querySelector('#profile-button');
const closeEditProfile = document.querySelector('#close-edit-profile');

editProfile.addEventListener('click',()=>{
    editProfileModal.showModal();
})
closeEditProfile.addEventListener('click',()=>{
    editProfileModal.close();
})
async function userInfo(){
    const id = document.querySelector("meta[name='loggedInId']").content;
    let url="/api/user/"+id;
    let result = await fetch(url).then(response => response.json())
        .then(data => {
            console.log(data)
        }).catch(error => console.error(error));
    return result;
}


userInfo();


