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