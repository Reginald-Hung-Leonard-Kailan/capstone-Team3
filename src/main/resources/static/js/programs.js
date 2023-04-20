showPlans();

function showPlans(){
    let options = document.getElementById('program-selection'),
        html='<option class="program" value="-1">Add Program</option>';
    if(workoutPlanArr.length > 0) {
        html += `<option class="program" value="0">Current Plan</option>`
    }
    for(let i=1;  i<workoutPlanArr.length; i++){
        html+=`<option class="program" value="${i}">${workoutPlanArr[i].date}</option>`
    }
    options.innerHTML = html;

    let plans = document.getElementsByClassName("program");
    let value = document.querySelector('#program-selection');

    value.addEventListener('change', function (){
        let placeholder = document.getElementById("program-input"),
            programTab = document.getElementById("program-button");

        if ( value.value === '-1'){
            placeholder.value = '';
            placeholder.placeholder = "Copy & Paste link here!"
            programTab.href = "#"
        } else {
            placeholder.value = workoutPlanArr[value.value].clientInformation;
            programTab.href = workoutPlanArr[value.value].clientInformation;
        }
    });
}

const addProgramBtn = document.getElementById("program-input-button")
addProgramBtn.addEventListener('click', async () => {
    let index = parseInt(document.getElementById("program-selection").value),
        data = document.getElementById("program-input").value;
    // console.log(newData); //string
    if(index === -1){
        await addInfo(data, todayRightFormat(), "workoutPlan")
        workoutPlanArr = [];
        await setAllArr();
        showPlans();
    } else {
        let {id, date, type} = workoutPlanArr[index];
        editInfo(id, data, date, type);
    }

})