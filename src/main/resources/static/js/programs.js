function showPlans(){
    let options = document.getElementById('program-selection'),
        html='<option class="program">Add Program</option>';
    html+= `<option class="program" value="0">Current Plan</option>`
    for(let i=1;  i<workoutPlanArr.length; i++){
        html+=`<option class="program" value="${i}">${workoutPlanArr[i].date}</option>
        `
    }
    options.innerHTML = html;

    let plans = document.getElementsByClassName("program");
    let value = document.querySelector('#program-selection');

    value.addEventListener('change', function (){
        let placeholder = document.getElementById("program-input"), link = workoutPlanArr[value.value].clientInformation, programTab = document.getElementById("program-button");

        placeholder.placeholder = link;
        programTab.href = "https://" + link;

    });
}