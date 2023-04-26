export const keys = {
    fileStack: "Ay0xIKQCERVwOWBLT9rHqz",
}

////Sleep
// function renderSleep(){
//     let id = document.querySelector("#sleep-days"),
//         html=``,
//         weekNames = getWeekdayNames(),
//         oneWeekAgo = new Date(),
//         total = 0,
//         count = 0;
//
//     let entries =[];
//
//     oneWeekAgo.setDate(oneWeekAgo.getDate() - 8);
//
//     let weekOldSleep = sleepArr.filter(entry => {
//         const entryDate = new Date(entry.date);
//         return entryDate >= oneWeekAgo;
//     });
//
//     weekOldSleep.map(obj => {
//         let {date, clientInformation, id, type} = obj,
//             weekDay = getDayOfWeek( date );
//         entries.push({ weekDay, clientInformation, id, type} );
//     });
//
//     for(let i=0; i<7; i++){
//         let rating = 0;
//         entries.map(entry => {
//             if(entry.weekDay === weekNames[i]){
//                 rating = parseInt(entry.clientInformation);
//                 total += rating;
//                 count++;
//             }
//         })
//         html += `
//                  <div>${weekNames[i]}: ${rating}</div>
//                  <hr>`
//     }
//
//     document.querySelector("#sleep-average").innerHTML = (total / count).toFixed(1);
//
//     id.innerHTML = html;
// }
//
//
// Message Leo