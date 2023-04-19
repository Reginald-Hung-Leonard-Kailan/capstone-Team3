"use strict"

const injuryDate = document.getElementById("injury-date");
const hiddenDate = document.getElementById("hidden-injury-date");

injuryDate.addEventListener("change", function (e){
    console.log(e.target.value);
    const date = new Date(e.target.value);
    hiddenDate.value = date.getTime();
    console.log(hiddenDate.value);
})