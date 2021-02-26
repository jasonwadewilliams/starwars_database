
function loadPeople() {
    console.log("something");
    
    const url = "https://www.swapi.tech/api/people";
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(json) {
            let results = "";
            console.log(json);

            let people = json.results;
            people.forEach(function(person) {
                results += "<button onclick=\"loadInfo(this.value)\" value=\"" + person.name + "\">" + person.name + "</button>";
            })

            document.getElementById("starwars_people").innerHTML = results;
        })   
    
}

function loadInfo(name) {
    console.log(name);
    document.getElementById("extra_info").innerHTML = "<p>" + name + "</p>";
}


document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
    return;

    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=668688cbc6435fd2de077db90e51e8a0";
    fetch(url)
        .then(function(response) {
        return response.json();
        })
        .then(function(json) {
            let results = "";
            results += '<h2>Weather in ' + json.name + " Today!</h2>";
            results += '<h2>' + json.main.temp + " &deg;F    -    feels like " + json.main.feels_like + " &deg;F</h2>"
            
            results += "<div id=\"today\">"
            for (let i=0; i < json.weather.length; i++) {
                results += '<div><img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/></div>';
            }
            results += "<div><p>"
            for (let i=0; i < json.weather.length; i++) {
                results += json.weather[i].description
                if (i !== json.weather.length - 1)
                    results += ", "
            }
            results += "</p></div>"
            results += "<div><p>Low- " + parseInt(json.main.temp_min) + "  High- " + parseInt(json.main.temp_max) + "</p></div>"
            results += "<div><p>"
            results += "Wind Speed - " + json.wind.speed + " MPH"
            results += "</p></div>"
            results += "<div><p>"
            var date = new Date(1000*json.sys.sunrise);

            results += "Sunrise - " + date.getHours() + ":" + padLeadingZeros(date.getMinutes(),2) + "." + date.getSeconds() + " AM"
            results += "</p></div>"
            results += "<div><p>"
            date = new Date(1000*json.sys.sunset);
            results += "Sunset - " + norm(date.getHours()) + ":" + padLeadingZeros(date.getMinutes(),2) + "." + date.getSeconds() + " PM"
            results += "</p></div>"

            results += "</div>"
            document.getElementById("weatherResults").innerHTML = results;
        });


        const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=307c87a3d38cb964afc43c18f9b5bf29";
        fetch(url2)
          .then(function(response) {
            return response.json();
          }).then(function(json) {
            let forecast = "";


            var day = new Date();

            for (let i=0; i < json.list.length; i++) {
                var tempDay = new Date(1000*json.list[i].dt);
                if (day.getDate() != tempDay.getDate() || i==0) {
                    day = tempDay;
                    if (i!=0) forecast += "</div>"
                    forecast += "<div class=\"day_box\" id=\"day" + day.getDate() + "\">";
                    forecast += "<h2>" + month[day.getMonth()] + " " + day.getDate() + "</h2>";
                }

                
                forecast += "<div id=\"time_slot\"><p><div id=\"time\">" + moment(tempDay.toLocaleString()).format('h:mm a') + "</div>"
                forecast += "   Temperature:   " + parseInt(json.list[i].main.temp) + "&deg;F</p>";
                forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/></div>'
            }

            document.getElementById("forecastResults").innerHTML = forecast;
            console.log(json);
          });
});

function norm (time) {
    if (time > 12) return time - 12;
    return time;
}


function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}