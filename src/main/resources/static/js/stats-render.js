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
    await renderProgram();
    await bodyFatChart();
    await bodyWeightChart();
    await squatChart();
    await benchChart();
    await deadliftChart();
    await fatigueCalendar(fatigueArr);
    // await renderProgram();

}

//retrieve from REST API
async function allInfo(id = viewId){
    let url = "/api/user/" + id, newToOld;

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
    //await fatigueCalendar(fatigueArr);
}

//Personal Info card
function viewerInfo(data){
    let {username, email, firstName, lastName, phoneNumber, bio, profilePicture} = data,
        id = document.querySelector("#personal-info"),
        html = "";
        helper = profilePicture;
        if (phoneNumber === null|| phoneNumber === ""){
            phoneNumber="no number added";
        }
        if(profilePicture == null || profilePicture === ""){
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
    document.getElementById("addinjury").href = "/add-injury/" + viewId;
}

//Injury Info card
function showInjury(data){
    let {injuryDate, status, title, description} = data.injuries,
        id = document.querySelector("#injury-info"),
        html = "",
        activeInjuries = [],
        passiveInjuries = [];

    for(let i = 0 ; i < data.injuries.length ; i++ ){
        let injury = data.injuries[i];
        if (injury.status === "active") {
            activeInjuries.push(injury);
        } else {
            passiveInjuries.push(injury);
        }
    }
    activeInjuries = activeInjuries.concat(passiveInjuries)

    for(let i = 0 ; i < activeInjuries.length ; i++ ){

        let injury = activeInjuries[i];

        let badges = injury.status;
        if(badges === "active"){
            badges = "badge bg-danger"
        }else{
            badges = "badge bg-success"
        }

        html += `<tr>
                  <td>Injury</td>
                  <td class="d-none d-xl-table-cell">${injury.injuryDate}</td>
                  <td class="d-none d-xl-table-cell">${injury.title}</td>
                  <td><span id="injury-status" <span class="${badges}">${injury.status}</span></td>
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
    // To switch back to normal just make i=0; i<7; i++
    for (let i = 6; i >= 0; i--) {
        let today = weekNames[i], date = "no entry", rating = 0, sheepPop = "", bed = "";
        entries.map(entry => {
            if(entry.weekDay === today){
                date = entry.date;
                // rating for our sheepPop
                rating = parseInt(entry.rating);
            }
        })

        if(rating > 3){
            bed = `<svg width="64px" height="64px" viewBox="-102.4 -102.4 1228.80 1228.80" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M366.31713 744.766507h524.451937l-21.246617-303.632256c-0.003197 0-401.128207-0.147058-503.20532 303.632256z" fill="#ffffff"></path><path d="M943.262215 744.766507v159.84515h-863.16381v-159.84515h800.088914z" fill="#ffffff"></path><path d="M240.774749 499.8198c56.968811 0 103.16406 46.163279 103.16406 103.13209s-46.195248 103.16406-103.16406 103.16406-103.132091-46.195248-103.13209-103.16406 46.163279-103.132091 103.13209-103.13209z" fill="#FFB578"></path><path d="M80.098405 986.676157a22.378321 22.378321 0 0 1-22.378321-22.378321v-529.183353a22.378321 22.378321 0 1 1 44.756642 0v529.183353a22.378321 22.378321 0 0 1-22.378321 22.378321zM943.259018 986.676157a22.378321 22.378321 0 0 1-22.378321-22.378321v-305.400143a22.378321 22.378321 0 1 1 44.756642 0v305.400143c0 12.362424-10.015897 22.378321-22.378321 22.378321z" fill="#000000"></path><path d="M943.259018 767.148025h-863.16381a22.378321 22.378321 0 1 1 0-44.756642h863.16381a22.378321 22.378321 0 1 1 0 44.756642z" fill="#000000"></path><path d="M240.774749 728.494271c-69.206556 0-125.510412-56.316643-125.510411-125.542381 0-69.203359 56.303856-125.510412 125.510411-125.510411 69.222541 0 125.542381 56.303856 125.542381 125.510411 0 69.225738-56.31984 125.542381-125.542381 125.542381z m0-206.29615c-44.526465 0-80.75377 36.224108-80.753769 80.753769 0 44.545646 36.227305 80.785739 80.753769 80.785739 44.545646 0 80.785739-36.240092 80.785739-80.785739 0-44.529662-36.240092-80.75377-80.785739-80.753769zM371.879742 766.7612a22.378321 22.378321 0 0 1-22.378322-22.378321c0-82.607974 58.106909-166.216578 159.419962-229.390578 102.352046-63.819775 234.201917-98.966526 371.265937-98.966526a22.378321 22.378321 0 1 1 0 44.756642c-128.803222 0-252.242041 32.739484-347.586476 92.185895-87.918029 54.817296-138.34278 124.589704-138.34278 191.41137a22.378321 22.378321 0 0 1-22.378321 22.381518z" fill="#000000"></path><path d="M880.187319 767.148025a22.378321 22.378321 0 0 1-22.378321-22.378321v-306.362411a22.378321 22.378321 0 1 1 44.756642 0v306.362411a22.378321 22.378321 0 0 1-22.378321 22.378321zM477.665262 429.487934h-167.837408a22.378321 22.378321 0 0 1-12.317667-41.061023l105.552146-69.58379H309.827854a22.378321 22.378321 0 1 1 0-44.756642h167.837408a22.378321 22.378321 0 0 1 12.317667 41.061022l-105.552146 69.583791h93.234479a22.378321 22.378321 0 1 1 0 44.756642zM636.612082 205.704724h-103.004215a22.378321 22.378321 0 0 1-12.31447-41.061023l40.71256-26.841197h-28.39809a22.378321 22.378321 0 1 1 0-44.756642h103.004215a22.378321 22.378321 0 0 1 12.31447 41.061022l-40.712559 26.841198h28.398089a22.378321 22.378321 0 1 1 0 44.756642zM868.38755 136.491774h-87.0197a22.378321 22.378321 0 0 1-12.31447-41.061023l24.715257-16.28822h-12.400787a22.378321 22.378321 0 1 1 0-44.756642h87.0197a22.378321 22.378321 0 0 1 12.31447 41.061022l-24.715257 16.288221h12.400787a22.378321 22.378321 0 1 1 0 44.756642zM943.259018 926.993175h-863.16381a22.378321 22.378321 0 1 1 0-44.756642h863.16381a22.378321 22.378321 0 1 1 0 44.756642z" fill="#000000"></path></g></svg>`;
        } else if (rating == 3){
            bed = `<svg fill="#000000" height="64px" width="64px" version="1.1" id="_x31_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-25.6 -25.6 179.20 179.20" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <polygon points="14.5,89.2 14.5,66.7 4.3,66.7 4.3,122 14.5,122 14.5,99.4 112.5,99.4 112.5,122 122.7,122 122.7,99.4 122.7,89.3 122.7,89.2 "></polygon> <circle cx="27" cy="32.1" r="7.7"></circle> <path d="M25.6,41.7c0,0-0.8-0.1-1-0.1c-2.4,0-4.3,1.9-4.3,4.3c0,0.1,0,28.8,0,28.8c0,1.2,0.7,2.3,1.7,2.9c0.5,0.3,1.1,0.5,1.6,0.5 c1.8,0,3.4-1.5,3.4-3.4v-2.1V53.2c0-0.6,0.4-1,1-1s1,0.4,1,1V71v3.7c0,1.2-0.5,2.4-1.2,3.4c-1,1.2-2.4,1.9-4.1,1.9 c-0.5,0-1.8-0.2-2.3-0.3l0.8,1.6c0.2,0.3,0.3,0.6,0.6,0.9c0.9,1.2,2.3,1.8,3.7,1.8c1.1,0,2.1-0.4,3-1.1l2.3-1.8l15.3-12.5L62,82.7 c1.9,1.8,5,1.7,6.8-0.2c1.8-1.9,1.7-5-0.2-6.8l-18-17c-1.8-1.7-4.5-1.8-6.3-0.2l-8.9,7.3c0.6-5.4,0.9-11.2,0.9-11.3 C36.3,48.1,31.6,42.8,25.6,41.7z"></path> <path d="M90.1,50.6c2.5,0,5.1-0.4,7.5-1.3c-9.3-3.2-16-11.9-16-22.2c0-10.4,6.7-19.2,16-22.2c-2.3-0.8-4.8-1.3-7.5-1.3 c-12.9,0-23.5,10.5-23.5,23.5C66.6,40.1,77.2,50.6,90.1,50.6z"></path> <polygon points="102.7,21.6 106,19.8 109.3,21.6 108.6,17.9 111.3,15.4 107.6,14.8 106,11.5 104.3,14.8 100.6,15.4 103.3,17.9 "></polygon> <polygon points="113.3,34.2 115.6,33 117.9,34.2 117.5,31.6 119.3,29.9 116.8,29.5 115.6,27.2 114.5,29.5 111.9,29.9 113.7,31.6 "></polygon> <polygon points="97.7,40.5 97.2,43.1 99.6,41.9 101.9,43.1 101.5,40.5 103.4,38.6 100.8,38.2 99.6,35.8 98.4,38.2 95.8,38.6 "></polygon> </g> </g></svg>`;
        } else {
            bed = `<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="-24.31 -24.31 170.18 170.18" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M116.808,56.824v-2.497h-6v2.497v10.002c-0.75-1.632-2.389-2.771-4.303-2.771h-13.8H74.836h-4.107v0.611 c0,0.111-0.002,0.223-0.008,0.336c2.252,1.836,5.031,4.727,6.453,8.547h4.115h5.408h19.809c1.914,0,3.553-1.14,4.303-2.771v4.523 H86.15h-4.314h-4.121c0.361,1.515,0.502,3.151,0.316,4.912c-0.037,0.338-0.078,0.705-0.125,1.088h4.137h3.895h24.871v15.834 h10.754V56.824H116.808z M74.836,64.678c0,0.024-0.002,0.05-0.002,0.074c-0.396-0.024-0.629-0.05-0.629-0.074l0.631-0.021V64.678z "></path> <path d="M15.056,73.549h24.203c1.357-3.629,3.926-6.406,6.027-8.196c-0.018-0.232-0.025-0.46-0.025-0.685v-0.611H33.556 c-20.414,0-22.053,1.139-22.805,2.77V56.824v-2.497h-6v2.497H0v40.312h10.752V81.303H38.52c-0.045-0.383-0.088-0.752-0.123-1.088 c-0.186-1.761-0.045-3.398,0.318-4.912H10.752v-4.523C11.504,72.41,13.142,73.549,15.056,73.549z"></path> <path d="M64.482,78.79c0.069-0.666-0.73-1.969-2.618-3.409c-2.418,0.687-4.99,0.715-7.41,0.094 c-1.811,1.412-2.578,2.676-2.512,3.315c0.076,0.712,0.184,1.565,0.313,2.513H64.17C64.301,80.355,64.408,79.502,64.482,78.79z"></path> <path d="M16,61.637h9.5c1.748,0,3.166-1.418,3.166-3.167s-1.418-3.167-3.166-3.167H16c-1.75,0-3.168,1.418-3.168,3.167 S14.25,61.637,16,61.637z"></path> <path d="M68.627,65.903c0.061-0.401,0.102-0.813,0.102-1.235v-21.75c8.689-0.983,14.057-2.644,15.967-4.948 c0.896-1.083,1.312-2.416,1.166-3.753c-0.17-1.572-2.627-6.366-18.308-11.823c0.044,0.163,0.08,0.337,0.118,0.508 c-1.461-4.034-5.314-6.922-9.851-6.922c-4.638,0-8.563,3.013-9.948,7.185c-13.977,5.152-16.293,9.541-16.457,11.052 c-0.145,1.337,0.269,2.67,1.167,3.753c1.813,2.188,6.745,3.796,14.679,4.795v21.903c0,0.528,0.061,1.036,0.152,1.529 c-3.848,2.998-7.662,7.792-7.029,13.809c0.752,7.137,4.176,25.729,4.322,26.516c0.428,2.318,2.451,3.939,4.727,3.939 c0.289,0,0.582-0.027,0.877-0.08c2.613-0.483,4.342-2.992,3.859-5.604c-0.035-0.19-3.502-19.011-4.215-25.776 c-0.232-2.217,2.268-4.443,4.117-5.724c1.24,0.419,2.572,0.646,3.922,0.646c1.459,0,2.893-0.269,4.217-0.754 c1.842,1.248,4.502,3.545,4.26,5.832c-0.711,6.766-4.18,25.586-4.215,25.776c-0.48,2.612,1.246,5.121,3.859,5.604 c0.295,0.053,0.588,0.08,0.879,0.08c2.274,0,4.299-1.621,4.727-3.939c0.145-0.787,3.57-19.379,4.32-26.516 C76.695,73.788,72.601,68.877,68.627,65.903z M65.857,35.166c-2.107,1.839-4.854,2.962-7.864,2.962 c-3.096,0-5.911-1.189-8.041-3.123c-2.721-0.315-5.328-0.728-7.39-1.16c1.225-0.616,4.158-1.652,6.04-2.373 c1.776,3.267,5.237,5.482,9.218,5.482c4.291,0,7.975-2.58,9.598-6.271c2.141,0.826,5.632,2.333,7.284,3.165 C72.273,34.356,69.092,34.838,65.857,35.166z"></path> <path d="M73.705,16.333c-0.03,1.246-0.051,2.492-0.047,3.738l0.004,1.113l0.822-0.744c1.201-1.092,2.391-2.195,3.545-3.34 c1.162-1.135,2.289-2.309,3.375-3.529c-1.332,0.947-2.621,1.939-3.877,2.971c-0.982,0.797-1.94,1.621-2.893,2.453 c-0.004-1.141-0.007-2.281-0.043-3.424l-0.025-0.809l-0.646,0.439c-0.896,0.611-1.788,1.234-2.664,1.877 c-0.875,0.646-1.744,1.303-2.592,1.992c0.984-0.477,1.945-0.986,2.9-1.508C72.285,17.167,72.996,16.749,73.705,16.333z"></path> <path d="M40.524,15.538c-0.902,0.859-1.799,1.725-2.677,2.609l-0.785,0.791l1.107,0.053c1.621,0.078,3.243,0.139,4.868,0.146 c1.625,0.02,3.251-0.016,4.882-0.109c-1.61-0.271-3.224-0.482-4.841-0.641c-1.259-0.131-2.52-0.227-3.781-0.311 c0.804-0.811,1.609-1.619,2.391-2.451l0.555-0.592l-0.77-0.146c-1.066-0.201-2.136-0.391-3.211-0.555 c-1.075-0.162-2.153-0.314-3.24-0.424c1.032,0.357,2.073,0.676,3.116,0.982C38.93,15.124,39.727,15.329,40.524,15.538z"></path> <path d="M92.557,32.438l-2.531,2.614l1.205,1.166l2.701-2.792c1.291,0.78,2.768,1.296,4.367,1.44 c1.714,0.154,3.365-0.129,4.854-0.749l2.258,3.379l1.395-0.932l-2.156-3.227c2.633-1.647,4.502-4.454,4.801-7.778 c0.17-1.894-0.196-3.709-0.959-5.313c0.385-0.092,0.742-0.278,1.023-0.579c0.829-0.887,0.709-2.346-0.266-3.259 c-0.977-0.913-2.44-0.934-3.27-0.048c-0.098,0.104-0.18,0.218-0.251,0.338c-1.538-1.265-3.456-2.098-5.584-2.29 c-2.25-0.203-4.392,0.349-6.194,1.433c-0.047-0.126-0.106-0.25-0.182-0.366c-0.656-1.02-2.101-1.261-3.224-0.537 c-1.124,0.723-1.502,2.137-0.845,3.157c0.246,0.382,0.602,0.653,1.009,0.808c-0.939,1.389-1.554,3.027-1.716,4.813 C88.681,27.153,90.115,30.346,92.557,32.438z M91.216,23.917c0.397-4.414,4.312-7.68,8.726-7.282 c4.412,0.398,7.68,4.312,7.281,8.725s-4.312,7.68-8.725,7.282C94.086,32.243,90.818,28.33,91.216,23.917z"></path> <polygon points="104.203,24.247 100.13,23.879 100.51,19.655 98.842,19.504 98.31,25.397 104.053,25.916 "></polygon> <path d="M87.199,16.562l-0.002-1.036c-1.207,0.003-2.295,0.642-2.908,1.713c-0.614,1.068-0.617,2.331-0.01,3.373l0.896-0.521 c-0.419-0.72-0.414-1.594,0.013-2.338C85.615,17.009,86.367,16.563,87.199,16.562z"></path> <path d="M83.361,21.773c-1.067-1.429-1.22-3.34-0.396-4.984c0.826-1.647,2.446-2.671,4.231-2.671c0,0,0,0,0.002,0v-1.035l0,0 c-2.181,0-4.156,1.242-5.158,3.242c-1.002,1.997-0.813,4.323,0.49,6.067L83.361,21.773z"></path> <path d="M113.006,18.682c0.626-1.033,0.645-2.295,0.05-3.376c-0.595-1.08-1.671-1.738-2.879-1.761l-0.021,1.035 c0.834,0.015,1.578,0.474,1.992,1.227c0.414,0.751,0.403,1.626-0.029,2.337L113.006,18.682z"></path> <path d="M114.127,14.411c0.979,1.561,1.01,3.479,0.082,5.003l0.885,0.538v-0.001c1.132-1.862,1.098-4.194-0.089-6.091 c-1.187-1.893-3.271-2.94-5.438-2.733l0.098,1.03C111.439,11.988,113.148,12.85,114.127,14.411z"></path> </g> </g> </g></svg>`
        }

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
         <div class="d-flex justify-content-center align-items-end" style="height: 100%;">
         <div>${bed}</div>
        </div>
 </div>`
    }
    id.innerHTML = html;
}

//Render Workout Program
function renderProgram(arr = workoutPlanArr){
    let id = document.querySelector("#program-info"),
        html = "";

    for(let i = 0; i < workoutPlanArr.length; i++){
        let {clientInformation, date, id} = workoutPlanArr[i],
            url = clientInformation;
        html += `<tr>
<td class="d-none d-xl-table-cell">${date}</td>
<td class="d-none d-xl-table-cell">${urlSplitter(url)}</td>
<td class="d-none d-xl-table-cell">
    <a class="text-primary" href="${url}" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link align-middle me-2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
    </a>
</td>
<td class="d-none d-xl-table-cell">
    <a class="text-info edit-program-btn" data-program="${id}" data-bs-toggle="modal" data-bs-target="#editPrograrmModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle me-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
    </a>
</td>
</tr>`;

    }
    id.innerHTML = html;
    showCustomInfo();
}

//This is so we remove the 'https://www.' and keep the '<name of site>' but no '.com/ etc'
function urlSplitter(url){
    url = url.split(/\/+/);
    return url[1];
}
/*
 * TODO:
 * -Check what is up with fatigue calendar....
 * -CRUD workout Program
 *  -- Still need to edit and delete (adding works)
 */

