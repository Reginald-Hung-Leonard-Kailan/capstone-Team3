let viewId = document.querySelector("meta[name='view']").content,
    workoutPlanArr = [],
    bodyWeightArr = [],
    bodyFatPercentArr = [],
    squatArr = [],
    benchArr = [],
    deadliftArr = [],
    sleepArr = [],
    fatigueArr = [],
    helper;

render();

//This is our starting method
async function render(){
    await allInfo();
    await renderSleep();
    await bodyFatChart();
    await bodyWeightChart();
    await squatChart();
    await benchChart();
    await deadliftChart();
    await fatigueCalendar();
    // await renderProgram();

}

//retrieve from REST API
async function allInfo(id = viewId){
    let url = "/api/user/" + id, newToOld;
    workoutPlanArr = [];
    bodyWeightArr = [];
    bodyFatPercentArr = [];
    squatArr = [];
    benchArr = [];
    deadliftArr = [];
    sleepArr = [];
    fatigueArr = [];

    let personalStats = await fetch(url).then(response => response.json())
        .then(data => {
            // const {username, email, firstName, lastName, phoneNumber, bio, profilePicture} = data;
            viewerInfo(data);
            showInjury(data);
            data = data.clientInformationList;
            return data.sort((b, a) => new Date(a.date) - new Date(b.date));
        }).catch(e => console.error(e));
    await personalStats.map(data => {
        switch (data.type){
            case "workoutPlan":
                workoutPlanArr.push(data);
                break;
            case "bodyWeight":
                bodyWeightArr.push(data);
                break;
            case "bodyFatPercent":
                bodyFatPercentArr.push(data);
                break;
            case "squat":
                squatArr.push(data);
                break;
            case "bench":
                benchArr.push(data);
                break;
            case "deadlift":
                deadliftArr.push(data);
                break;
            case "sleep":
                sleepArr.push(data);
                break;
            case "fatigue":
                fatigueArr.push(data);
                break;
        }
    })
    // await fatigueCalendar();
}

//Personal Info card
function viewerInfo(data){
    let {username, email, firstName, lastName, phoneNumber, bio, profilePicture} = data,
        id = document.querySelector("#personal-info"),
        html = "";
        if(profilePicture === null){
            profilePicture= "../img/profilePicPlaceholder.png";
    }

    html = `<div class="card-content"> 
<div style="display: flex; justify-content: center;"><img id="user-stats-picture" src="${profilePicture}"/></div>
<h1>${firstName} ${lastName}</h1>
<div> ${phoneNumber}</div>
<div> ${email}</div>
<!--<div>bio: ${bio}</div>-->

</div>`;

    id.innerHTML = html;
}

//Injury Info card

function showInjury(data){
    let {injuryDate, status, title, description} = data.injuries,
        id = document.querySelector("#injury-info"),
        html = "";

    for(let i = 0 ; i < data.injuries.length ; i++ ){

        let injury = data.injuries[i];
        html += `<tr>
                  <td>Injury</td>
                  <td class="d-none d-xl-table-cell">${injury.injuryDate}</td>
                  <td class="d-none d-xl-table-cell">${injury.title}</td>
                  <td><span id="injury-status" style="color: #0a0a0a">${injury.status}</span></td>
                  <td class="d-none d-md-table-cell">${injury.description}</td>
                  <td class="d-none d-md-table-cell"><a href="/injury/edit/${injury.id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></a></td> 
                </tr>`;
    }



    id.innerHTML = html;
}


//Sleep Ratings
function renderSleep(arr = sleepArr){

    let id = document.querySelector("#sleep-cards"),
        html = "",
        sheep = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 428.348 428.348" xml:space="preserve" width="30px" height="30px" fill="#000000">\n' + '\n' + '<g id="SVGRepo_bgCarrier" stroke-width="0"/>\n' + '\n' + '<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>\n' + '\n' + '<g id="SVGRepo_iconCarrier"> <g> <g> <g> <rect x="124.926" y="315.896" style="fill:#5C6670;" width="21.807" height="40.332"/> <rect x="124.926" y="356.228" style="fill:#2D3740;" width="21.807" height="8.666"/> </g> <path style="fill:#C8C9C9;" d="M104.387,258.125c0-17.365,14.078-31.441,31.443-31.441s31.441,14.076,31.441,31.441v37.232 c0,17.365-14.076,31.441-31.441,31.441s-31.443-14.076-31.443-31.441V258.125z"/> </g> <g> <g> <rect x="280.49" y="315.896" style="fill:#5C6670;" width="21.807" height="40.332"/> <rect x="280.49" y="356.228" style="fill:#2D3740;" width="21.807" height="8.666"/> </g> <path style="fill:#C8C9C9;" d="M259.951,258.125c0-17.365,14.078-31.441,31.443-31.441s31.441,14.076,31.441,31.441v37.232 c0,17.365-14.076,31.441-31.441,31.441s-31.443-14.076-31.443-31.441V258.125z"/> </g> <g> <g> <rect x="85.367" y="315.896" style="fill:#7D868C;" width="21.807" height="40.332"/> <rect x="85.367" y="356.228" style="fill:#333E48;" width="21.807" height="8.666"/> </g> <path style="fill:#DADBDC;" d="M64.828,258.125c0-17.365,14.077-31.441,31.442-31.441s31.442,14.076,31.442,31.441v37.232 c0,17.365-14.077,31.441-31.442,31.441s-31.442-14.076-31.442-31.441V258.125z"/> </g> <g> <g> <rect x="240.932" y="315.896" style="fill:#7D868C;" width="21.807" height="40.332"/> <rect x="240.932" y="356.228" style="fill:#333E48;" width="21.807" height="8.666"/> </g> <path style="fill:#DADBDC;" d="M220.393,258.125c0-17.365,14.077-31.441,31.442-31.441s31.442,14.076,31.442,31.441v37.232 c0,17.365-14.077,31.441-31.442,31.441s-31.442-14.076-31.442-31.441V258.125z"/> </g> <path style="fill:#DADBDC;" d="M363.014,214.971c0-8.082-3.428-15.359-8.904-20.471c-0.824-36.938-20.643-69.186-50.075-87.369 c0.206-1.367,0.313-2.766,0.313-4.191c0-15.463-12.536-28-28-28c-2.433,0-4.793,0.313-7.043,0.895 c-5.129-5.787-12.615-9.439-20.957-9.439c-8.904,0-16.832,4.16-21.96,10.639c-8.49-8.395-20.157-13.58-33.04-13.58 c-10.281,0-19.785,3.311-27.523,8.912c-5.111-5.48-12.391-8.912-20.477-8.912c-12.553,0-23.176,8.262-26.73,19.643 c-6.646-3.598-14.258-5.643-22.347-5.643c-17.181,0-32.202,9.221-40.398,22.983c-2.646-1.667-5.77-2.646-9.128-2.646 c-2.074,0-4.053,0.387-5.893,1.061c-2.463-3.594-6.595-5.955-11.28-5.955c-4.256,0-8.056,1.945-10.563,4.995 c-0.603-0.063-1.214-0.101-1.834-0.101C7.689,97.791,0,105.48,0,114.965s7.689,17.174,17.174,17.174 c2.561,0,4.979-0.578,7.158-1.588c-1.959,3.767-3.095,8.03-3.149,12.557c-10.39,8.621-17.009,21.629-17.009,36.185 c0,12.426,4.832,23.719,12.707,32.123c-2.387,5.631-3.707,11.824-3.707,18.326c0,24.064,18.092,43.893,41.412,46.658 c18.527,16.152,42.749,25.938,69.259,25.938h0.979c3.47,1.541,7.309,2.404,11.35,2.404s7.88-0.863,11.35-2.404h8.961 c9.014,8.406,21.104,13.559,34.4,13.559c13.299,0,25.387-5.152,34.401-13.559h23.411c16.447,0,32.014-3.768,45.887-10.484 c3.299,0.732,6.723,1.133,10.242,1.133c25.957,0,47-21.043,47-47c0-2.77-0.254-5.477-0.713-8.113 C358.309,232.807,363.014,224.439,363.014,214.971z"/> <g> <path style="fill:#5C6670;" d="M386.346,92.971c23.197,0,42.002,18.805,42.002,42.004c0,23.195-18.805,42-42.002,42h-49.733 c-23.196,0-42.001-18.805-42.001-42c0-23.199,18.805-42.004,42.001-42.004C336.613,92.971,386.346,92.971,386.346,92.971z"/> <circle style="fill:#333E48;" cx="367.015" cy="124.453" r="6.487"/> <path style="fill:#DADBDC;" d="M353.49,70.43c-5.527,0-10.53,2.242-14.151,5.863c-5.103-6.869-13.276-11.322-22.491-11.322 c-15.464,0-28,12.537-28,28c0,0.154,0.01,0.305,0.012,0.457c-22.885,3.162-40.512,22.789-40.512,46.543c0,25.957,21.043,47,47,47 c3.945,0,7.774-0.492,11.436-1.408c3.217,6.748,10.08,11.424,18.053,11.424c11.053,0,20.012-8.961,20.012-20.012 c0-6.365-2.982-12.025-7.615-15.689c3.264-6.4,5.115-13.639,5.115-21.314c0-9.412-2.777-18.17-7.542-25.521 c2.681-2.244,4.937-4.977,6.625-8.066c3.357,2.543,7.525,4.07,12.06,4.07c11.052,0,20.012-8.961,20.012-20.012 S364.542,70.43,353.49,70.43z"/> <path style="fill:#5C6670;" d="M318.014,128.896l4.334,19.998c1.077,4.971-2.079,9.873-7.05,10.951 c-4.971,1.076-9.873-2.08-10.95-7.051c-0.285-1.313-0.262-2.666,0-3.9l4.334-19.998c0.559-2.578,3.1-4.215,5.678-3.656 C316.245,125.648,317.628,127.125,318.014,128.896z"/> </g> </g> </g>\n' + '\n' + '</svg>',
        weekNames = getWeekdayNames(),
        oneWeekAgo = new Date(),
        entries = [];

    // Set our limits to this past week
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Here we filter out our array so it's within the past week
    let weekOldSleep = sleepArr.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= oneWeekAgo;
    })

    // We convert the information that is left into a readable format
    weekOldSleep.map(obj => {
        let {date, clientInformation, id, type} = obj,
            weekDay = getDayOfWeek( date ),
            rating = clientInformation;
    let monthDay = date.split('-').slice(1).join('-');
        entries.push({ weekDay, date, rating, id, type} );
    });

    // Create the HTML
    for (let i = 0; i < 7; i++) {
        let today = weekNames[i], date = "no entry", rating = 0, sheepPop = "";
        entries.map(entry => {
            if(entry.weekDay === today){
                date = entry.date;
                // rating for our sheepPop
                rating = parseInt(entry.rating);
            }
        })
        // repeat the sheep populating based off rating score!
        for(let j = 0; j < rating; j++){
            sheepPop += sheep;
        }
        html+= `
 <div class="card d-flex" style="text-align: center;" id="sleep-card">
         <div class="card-title">${today}</div>
         <div class="card-title">${date}</div> 
         <hr style="margin-top: 0px;">
         <div>${sheepPop}</div> 
<!--         <div>${id}</div>-->
 </div>`
    }
    id.innerHTML = html;
}

/*
 * TODO:
 * -Add Fatigue to the calendar chart
 * -injuries
 * ---grab from our api
 * ---render it correctly
 * ---CRUD
 */
