
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

const bodyweightChartModal = document.querySelector('#bodyweight-chart-modal');
const viewBodyweightChart = document.querySelector('#view-bodyWeight-chart');
const closeBodyweightChart = document.querySelector('#close-bodyweight-chart');

viewBodyweightChart.addEventListener('click',()=>{
    bodyweightChartModal.showModal();
})
closeBodyweightChart.addEventListener('click',()=>{
    bodyweightChartModal.close();
})

const squatChartModal = document.querySelector('#squat-chart-modal');
const viewSquatChart = document.querySelector('#view-squat-chart');
const closeSquatChart = document.querySelector('#close-squat-chart');

viewSquatChart.addEventListener('click',()=>{
    squatChartModal.showModal();
})
closeSquatChart.addEventListener('click',()=>{
    squatChartModal.close();
})

const benchChartModal = document.querySelector('#bench-chart-modal');
const viewBenchChart = document.querySelector('#view-bench-chart');
const closeBenchChart = document.querySelector('#close-bench-chart');

viewBenchChart.addEventListener('click',()=>{
    benchChartModal.showModal();
})
closeBenchChart.addEventListener('click',()=>{
    benchChartModal.close();
})

const deadliftChartModal = document.querySelector('#deadlift-chart-modal');
const viewDeadliftChart = document.querySelector('#view-deadlift-chart');
const closeDeadliftChart = document.querySelector('#close-deadlift-chart');

viewDeadliftChart.addEventListener('click',()=>{
    deadliftChartModal.showModal();
})
closeDeadliftChart.addEventListener('click',()=>{
    deadliftChartModal.close();
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


const editBodyWeightModal = document.querySelector('#edit-bodyWeight-modal');
const editBodyWeight = document.querySelector('#edit-bodyweight-chart');
const closeBodyWeightChart = document.querySelector('#close-edit-bodyWeight-chart');

editBodyWeight.addEventListener('click',()=>{
    editBodyWeightModal.showModal();
})
closeBodyWeightChart.addEventListener('click',()=>{
    editBodyWeightModal.close();
})

const editSquatModal = document.querySelector('#edit-squat-modal');
const editSquat = document.querySelector('#edit-squat-chart');
const closeSquatChart2 = document.querySelector('#close-edit-squat-chart');

editSquat.addEventListener('click',()=>{
    editSquatModal.showModal();
})
closeSquatChart2.addEventListener('click',()=>{
    editSquatModal.close();
})

const editBenchModal = document.querySelector('#edit-bench-modal');
const editBench= document.querySelector('#edit-bench-chart');
const closeBenchChart2 = document.querySelector('#close-edit-bench-chart');

editBench.addEventListener('click',()=>{
    editBenchModal.showModal();
})
closeBenchChart2.addEventListener('click',()=>{
    editBenchModal.close();
})

const editDeadliftModal = document.querySelector('#edit-deadlift-modal');
const editDeadlift = document.querySelector('#edit-deadlift-chart');
const closeDeadlift2= document.querySelector('#close-edit-deadlift-chart');

editDeadlift.addEventListener('click',()=>{
    editDeadliftModal.showModal();
})
closeDeadlift2.addEventListener('click',()=>{
    editDeadliftModal.close();
})

const injuryModal = document.querySelector('#injury-modal');
const closeInjury = document.querySelector('#close-injury');

closeInjury.addEventListener('click',()=>{
    injuryModal.close();
})

const reloadClients= document.querySelector('#defaultOpen');
reloadClients.addEventListener('click', ()=>{
    document.querySelector('meta[name="view"]').content = document.querySelector('meta[name="loggedInId"]').content;
    reloadClients.addEventListener('click', ()=>{
        location.href = location.href;
    })
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

// const editProfileModal = document.querySelector('#edit-profile-modal');
// const editProfile = document.querySelector('#profile-button');
// const closeEditProfile = document.querySelector('#close-edit-profile');
//
// editProfile.addEventListener('click',()=>{
//     editProfileModal.showModal();
// })
// closeEditProfile.addEventListener('click',()=>{
//     editProfileModal.close();
// })



// async function userInfo(){
//     const id = document.querySelector("meta[name='loggedInId']").content;
//     let url="/api/user/"+id;
//     let result = await fetch(url).then(response => response.json())
//         .then(data => {
//             console.log(data)
//         }).catch(error => console.error(error));
//     return result;
// }


// userInfo();


