
function loadEvents() {
    loadPeople()
    loadPlanets()
    loadStarships()
}

function loadPeople() {    
    const url = "https://www.swapi.tech/api/people";
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(json) {
            let results = "<h1>PEOPLE</h1>";
            let people = json.results;
            people.forEach(function(person) {
                results += "<div class='buttons'><button onclick=\"loadNameInfo(this.value)\" value=\"" + person.url + "\">" + person.name + "</button></div>";
            })
            document.getElementById("starwars_people").innerHTML = results;
        })   
}

function loadPlanets() {    
    const url = "https://www.swapi.tech/api/planets";
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(json) {
            let results = "<h1>PLANETS</h1>";
            let planets = json.results;
            planets.forEach(function(planet) {
                results += "<div class='buttons'><button onclick=\"loadPlanetInfo(this.value)\" value=\"" + planet.url + "\">" + planet.name + "</button></div>";
            })
            document.getElementById("starwars_planets").innerHTML = results;
        })   
}

function loadStarships() {    
    const url = "https://www.swapi.tech/api/starships";
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(json) {
            let results = "<h1>STARSHIPS</h1>";
            let ships = json.results;
            ships.forEach(function(ship) {
                results += "<div class='buttons'><button onclick=\"loadShipInfo(this.value)\" value=\"" + ship.url + "\">" + ship.name + "</button></div>";
            })
            document.getElementById("starwars_ships").innerHTML = results;
        })   
}

function getObject(url) {
    return fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(json) {
            return json.result
        })
}

function getPeopleUrls() {
    const url = "https://www.swapi.tech/api/people";
    return fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(json) {
            let people = json.results;
            let peopleArray = []
            people.forEach(function(person) {
                peopleArray.push(person.url)
            })
            return peopleArray
        })  
}

async function checkPlanetPeople(planetUrl) {
    let personArray = await getPeopleUrls()
    let peopleFromPlanet = []
    for (var i=0; i<personArray.length; i++) {
        let person = await getObject(personArray[i])
        if (person.properties.homeworld == planetUrl) {
            peopleFromPlanet.push(person)
        }
    }
    return peopleFromPlanet
}

async function loadNameInfo(url) {
    let person = await getObject(url)
    let homeworld = await getObject(person.properties.homeworld)
    let preposition = ""
    let organic = ""
    if (person.properties.gender == "male") {
        preposition = "he"
        organic = "born"
    } else if (person.properties.gender == "female") {
        preposition = "she"
        organic = "born"
    } else {
        preposition = ""
        organic = "created"
    }

    let info = "<h2 class='horizontal'>" + person.properties.name + "</h2>"
    info += "<div class='middle'>" + person.properties.name + " is from the planet "
    info += "<button onclick=\"loadPlanetInfo(this.value)\" value=\"" + person.properties.homeworld + "\">" + homeworld.properties.name + "</button>"
    info += " and " + preposition + " was " + organic + " in the year " + person.properties.birth_year + ".<p><div>"
    info += "<div class='horizontal'>"
    info += "<div id='facts'><p>Hair Color: " + person.properties.hair_color + "</p></div>"
    info += "<div id='facts'><p>Eye Color: " + person.properties.eye_color + "</p></div>"
    info += "<div id='facts'><p>Height: " + person.properties.height + "cm</p></div>"
    info += "<div id='facts'><p>Weight: " + person.properties.mass + "Kgs</p></div>"
    info += "<div id='facts'><p>Skin Color: " + person.properties.skin_color + "</p></div>"
    info += "</div>"
    document.getElementById("extra_info").innerHTML = info
}

async function loadPlanetInfo(url) {
    let planet = await getObject(url)

    let info = "<h2 class='horizontal'>" + planet.properties.name + "</h2>"
    info += "<div class='middle'>" + planet.properties.name + " is a planet is " + planet.properties.climate + " and " + planet.properties.terrain + ".</p></div>"
    info += "<div class='horizontal'>"
    info += "<div id='facts'><p>Diameter: " + planet.properties.diameter + "</p></div>"
    info += "<div id='facts'><p>Gravity: " + planet.properties.gravity + "</p></div>"
    info += "<div id='facts'><p>Days in a Year: " + planet.properties.orbital_period + "cm</p></div>"
    info += "<div id='facts'><p>Hours in a Day: " + planet.properties.rotation_period + "Kgs</p></div>"
    info += "<div id='facts'><p>Population: " + planet.properties.population + "</p></div>"
    info += "</div>"
    info += "<div class='horizontal'>"

    info += "<p>People from " + planet.properties.name + "</p>"
    let personArray = await checkPlanetPeople(planet.properties.url)
    for (var i=0; i<personArray.length; i++) {
        info += "<button onclick=\"loadNameInfo(this.value)\" value=\"" + personArray[i].properties.url + "\">" + personArray[i].properties.name + "</button>"
    }
    info += "</div>"
    document.getElementById("extra_info").innerHTML = info
}



async function loadShipInfo(url) {
    let ship = await getObject(url)
    console.log(ship)
    let info = "<h2 class='horizontal'>" + ship.properties.name + "</h2>"
    info += "<div class='middle'>The " + ship.properties.name + " is " + ship.description + " made by " + ship.properties.manufacturer + ".</p></div>"
    info += "<div class='horizontal'>"
    info += "<div id='facts'><p>Passenger Capacity: " + ship.properties.passengers + "</p></div>"
    info += "<div id='facts'><p>cargo Capacity: " + ship.properties.cargo_capacity + "</p></div>"
    info += "<div id='facts'><p>Length: " + ship.properties.length + "</p></div>"
    info += "<div id='facts'><p>Hyperdrive Rating: " + ship.properties.hyperdrive_rating + "</p></div>"
    info += "<div id='facts'><p>Cost: " + ship.properties.cost_in_credits + "-credits</p></div>"
    info += "</div>"

    document.getElementById("extra_info").innerHTML = info
}

