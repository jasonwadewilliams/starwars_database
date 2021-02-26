
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

async function loadNameInfo(url) {
    let person = await getObject(url)
    let homeworld = await getObject(person.properties.homeworld)
    console.log(person)
    console.log(homeworld)
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
    info += "<div>" + person.properties.name + " is from the planet "
    info += "<button onclick=\"loadPlanetInfo(this.value)\" value=\"" + person.properties.homeworld + "\">" + homeworld.properties.name + "</button>"
    info += " and " + preposition + " was " + organic + " in the year " + person.properties.birth_year + ".<p><div>"
    info += "<div id='facts'>"
    info += "<div><p></p></div>"
    info += "</div>"
    document.getElementById("extra_info").innerHTML = info
}

async function loadPlanetInfo(url) {
    let planet = await getObject(url)

    let info = "<h2>" + planet.properties.name + "</h2>"

    document.getElementById("extra_info").innerHTML = info
}

async function loadShipInfo(url) {
    let ship = await getObject(url)

    let info = "<h2>" + ship.properties.name + "</h2>"

    document.getElementById("extra_info").innerHTML = info
}

