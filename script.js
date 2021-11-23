window.addEventListener("load", function(){
    let json = [];
    const fetchPromise = fetch("https://handlers.education.launchcode.org/static/astronauts.json");
    fetchPromise.then( function(response) {
        response.json().then(function(json) {
            const div = document.getElementById("container");

            //sort astronauts by time in space
            const sort = document.getElementById("sort");
            sort.addEventListener("click", function() {
                let spaceHours = [];
                for (let k = 0; k < json.length; k++) {
                    spaceHours.push(json[k].hoursInSpace);
                }
                spaceHours.sort();
                console.log(spaceHours);
            });


            //add html with JSON data
            for (let i = 0; i < json.length; i++) {

                div.insertAdjacentHTML('beforeend', `
                <div class="astronaut">
                    <div class="bio">
                        <h3>${json[i].firstName} ${json[i].lastName}</h3>
                        <ul>
                            <li>Hours in space: ${json[i].hoursInSpace}</li>
                            <li id="${json[i].id}">Active: ${json[i].active}</li>
                            <li>Skills: ${json[i].skills}</li>
                        </ul>
                    </div>
                    <img class="avatar" src="${json[i].picture}">
                </div>
                `);
                
                //active green
                if (json[i].active) {
                    document.getElementById(`${json[i].id}`).style.color = "green";
                };
            };

            //number of astronauts
            div.insertAdjacentHTML('beforeend', `<div class="count">Astronauts: ${json.length}</div>`)
            

        });
    });
});