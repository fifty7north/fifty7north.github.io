//Api keys to insert into urls
const api = {
    key: 'c6dab120ab739963cf9ba9be756c9e1e',
    base: 'https://api.openweathermap.org/data/2.5/',
    latlon: 'https://api.openweathermap.org/geo/1.0/'
}

const searchbox = document.querySelector('.searchBox');
searchbox.addEventListener('keypress', setQuery);

//Load results for Elgin immediately on page load
document.onload = getCoordinates ('Elgin, GB')

//If enter is pressed, get coordinate of user input
function setQuery(evt) {
    if (evt.keyCode == 13) {
        getCoordinates(searchbox.value);
    }
}

//Gets coordinates of location from user input
function getCoordinates (query) {
    //Sends user input to geocoding api
    fetch(`${api.latlon}direct?q=${query}&limit=5&appid=${api.key}`)
        //Returns results
        .then(latlon => {
            return latlon.json();
        }).then(saveCoordinates);
}

//Saves coordinates as variables
function saveCoordinates (latlon){
    //Show results in console log for testing purposes
    console.log(latlon);

    //Set latitude variable
    let lat = `${latlon[0].lat}`;

    //Set longitude variable
    let lon = `${latlon[0].lon}`;

    //Set city name on webpage
    let city = document.querySelector('.basicWeather .location');
    city.innerText = `${latlon[0].name}, ${latlon[0].country}`;

    getResults(lat, lon);
}

//Get results from API
function getResults (lat, lon) {
    fetch(`${api.base}onecall?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`)
    .then(weather => {return weather.json();})
    .then(displayResults);
}

//Display results on the webpage
function displayResults (weather) {
    console.log(weather);

    //Display current weather type
    let currentWeather = document.querySelector('.basicWeather .currentWeatherContainer .currentWeather');
    currentWeather.innerHTML = weather.current.weather[0].main;

    //Display current temp
    let temp = document.querySelector('.basicWeather .currentTemp');
    temp.innerHTML = `${Math.round(weather.current.temp)}<span>°C</span>`;

    //Display feels like temp
    let feelsLike = document.querySelector('.basicWeather .feelsLike');
    feelsLike.innerHTML = `<span>Feels like </span>${Math.round(weather.current.feels_like)}<span>°C</span>`;

    //Display humidity
    let humidity = document.querySelector('.detailedWeather .humidity');
    humidity.innerHTML = `${weather.current.humidity}<span>%</span>`;

    //Display pressure
    let pressure = document.querySelector('.detailedWeather .pressure');
    pressure.innerHTML = `${weather.current.pressure}<span>mb</span>`;

    //Display wind
        //Add wind direction
    let wind = document.querySelector('.detailedWeather .wind');
    wind.innerHTML = `${Math.round((weather.current.wind_speed)*2.2369)}<span>mph @</span>${weather.current.wind_deg}<span>°</span>`;

    //Display rain
    let rain = document.querySelector('.detailedWeather .rain');
    let rainValueRaw = weather.current.rain;
    //Convert rain data into string
    let rainValue = JSON.stringify(rainValueRaw);
    //If rain value is not undefined, trim rain value string and display rain
    if (rainValue != undefined) {
        let rainValueReplace1 = rainValue.replace('{"1h":','');
        let rainValueReplace2 = rainValueReplace1.replace('}','');
        if (rainValueReplace2 > 0) {
            rain.innerHTML = `${rainValueReplace2}<span>mm</span>`;
        } else {
            rain.innerHTML = `<span>0mm</span>`;
    }
    //Else display 0mm of rain
    } else {
        rain.innerHTML = `<span>0mm</span>`
    }



    //Display hourly temperatures
    let hour2Temp = document.querySelector('.hour2Temp')
    hour2Temp.innerHTML = `${Math.round(weather.hourly[2].temp)}<span>°C</span>`;

    let hour4Temp = document.querySelector('.hour4Temp')
    hour4Temp.innerHTML = `${Math.round(weather.hourly[4].temp)}<span>°C</span>`;

    let hour6Temp = document.querySelector('.hour6Temp')
    hour6Temp.innerHTML = `${Math.round(weather.hourly[6].temp)}<span>°C</span>`;

    let hour8Temp = document.querySelector('.hour8Temp')
    hour8Temp.innerHTML = `${Math.round(weather.hourly[8].temp)}<span>°C</span>`;

    let hour10Temp = document.querySelector('.hour10Temp')
    hour10Temp.innerHTML = `${Math.round(weather.hourly[10].temp)}<span>°C</span>`;

    let hour12Temp = document.querySelector('.hour12Temp')
    hour12Temp.innerHTML = `${Math.round(weather.hourly[12].temp)}<span>°C</span>`;

    //Display hourly icons
    let hour2Icon = document.querySelector('#hour2Icon');
    let iconHour2 = weather.hourly[2].weather[0].icon;
    hour2Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconHour2}@2x.png" alt="${weather.hourly[2].weather[0].main} weather icon">`;

    let hour4Icon = document.querySelector('#hour4Icon');
    let iconHour4 = weather.hourly[4].weather[0].icon;
    hour4Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconHour4}@2x.png" alt="${weather.hourly[4].weather[0].main} weather icon">`;

    let hour6Icon = document.querySelector('#hour6Icon');
    let iconHour6 = weather.hourly[6].weather[0].icon;
    hour6Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconHour6}@2x.png" alt="${weather.hourly[6].weather[0].main} weather icon">`;

    let hour8Icon = document.querySelector('#hour8Icon');
    let iconHour8 = weather.hourly[8].weather[0].icon;
    hour8Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconHour8}@2x.png" alt="${weather.hourly[8].weather[0].main} weather icon">`;

    let hour10Icon = document.querySelector('#hour10Icon');
    let iconHour10 = weather.hourly[10].weather[0].icon;
    hour10Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconHour10}@2x.png" alt="${weather.hourly[10].weather[0].main} weather icon">`;

    let hour12Icon = document.querySelector('#hour12Icon');
    let iconHour12 = weather.hourly[12].weather[0].icon;
    hour12Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconHour12}@2x.png" alt="${weather.hourly[12].weather[0].main} weather icon">`;

    //Save correct hours for hourly forecast cards
    const hour0 = new Date();
    let hour0Value = hour0.getHours()+((weather.timezone_offset-3600)/3600);
    hour0.setHours(hour0.getHours()+((weather.timezone_offset-3600)/3600)+2);
    let hour2Value = hour0.getHours();
    hour0.setHours(hour0.getHours()+2);
    let hour4Value = hour0.getHours();
    hour0.setHours(hour0.getHours()+2);
    let hour6Value = hour0.getHours();
    hour0.setHours(hour0.getHours()+2);
    let hour8Value = hour0.getHours();
    hour0.setHours(hour0.getHours()+2);
    let hour10Value = hour0.getHours();
    hour0.setHours(hour0.getHours()+2);
    let hour12Value = hour0.getHours();

    //Display correct hours in hourly forecast cards
    let hour2 = document.querySelector('.hour2');
    hour2.innerHTML = hour2Value+':00';
    let hour4 = document.querySelector('.hour4');
    hour4.innerHTML = hour4Value+':00';
    let hour6 = document.querySelector('.hour6');
    hour6.innerHTML = hour6Value+':00';
    let hour8 = document.querySelector('.hour8');
    hour8.innerHTML = hour8Value+':00';
    let hour10 = document.querySelector('.hour10');
    hour10.innerHTML = hour10Value+':00';
    let hour12 = document.querySelector('.hour12');
    hour12.innerHTML = hour12Value+':00';



    //Display daily temperatures
    let day1Temp = document.querySelector('.day1Temp')
    day1Temp.innerHTML = `${Math.round(weather.daily[1].temp.day)}<span>°C</span>`;

    let day2Temp = document.querySelector('.day2Temp')
    day2Temp.innerHTML = `${Math.round(weather.daily[2].temp.day)}<span>°C</span>`;

    let day3Temp = document.querySelector('.day3Temp')
    day3Temp.innerHTML = `${Math.round(weather.daily[3].temp.day)}<span>°C</span>`;

    let day4Temp = document.querySelector('.day4Temp')
    day4Temp.innerHTML = `${Math.round(weather.daily[4].temp.day)}<span>°C</span>`;

    let day5Temp = document.querySelector('.day5Temp')
    day5Temp.innerHTML = `${Math.round(weather.daily[5].temp.day)}<span>°C</span>`;

    let day6Temp = document.querySelector('.day6Temp')
    day6Temp.innerHTML = `${Math.round(weather.daily[6].temp.day)}<span>°C</span>`;

    let day7Temp = document.querySelector('.day7Temp')
    day7Temp.innerHTML = `${Math.round(weather.daily[7].temp.day)}<span>°C</span>`;
    weather.daily[1].weather[0].main
    
    //Display daily icons
    let day1Icon = document.querySelector('#day1Icon');
    let iconDay1 = weather.daily[1].weather[0].icon;
    day1Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconDay1}@2x.png" alt="${weather.daily[1].weather[0].main} weather icon">`;

    let day2Icon = document.querySelector('#day2Icon');
    let iconDay2 = weather.daily[2].weather[0].icon;
    day2Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconDay2}@2x.png" alt="${weather.daily[2].weather[0].main} weather icon">`;

    let day3Icon = document.querySelector('#day3Icon');
    let iconDay3 = weather.daily[3].weather[0].icon;
    day3Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconDay3}@2x.png" alt="${weather.daily[3].weather[0].main} weather icon">`;

    let day4Icon = document.querySelector('#day4Icon');
    let iconDay4 = weather.daily[4].weather[0].icon;
    day4Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconDay4}@2x.png" alt="${weather.daily[4].weather[0].main} weather icon">`;

    let day5Icon = document.querySelector('#day5Icon');
    let iconDay5 = weather.daily[5].weather[0].icon;
    day5Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconDay5}@2x.png" alt="${weather.daily[5].weather[0].main} weather icon">`;

    let day6Icon = document.querySelector('#day6Icon');
    let iconDay6 = weather.daily[6].weather[0].icon;
    day6Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconDay6}@2x.png" alt="${weather.daily[6].weather[0].main} weather icon">`;

    let day7Icon = document.querySelector('#day7Icon');
    let iconDay7 = weather.daily[7].weather[0].icon;
    day7Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconDay7}@2x.png" alt="${weather.daily[7].weather[0].main} weather icon">`;

    //Display tomorrow details
    let day1Wind = document.querySelector('.day1Wind');
    day1Wind.innerHTML = `${Math.round((weather.daily[1].wind_speed)*2.2369)}<span>mph @</span>${weather.daily[1].wind_deg}<span>°</span>`;

    let day1Rain = document.querySelector('.day1Rain');
    let day1RainValue = weather.daily[1].rain;
    if (day1RainValue > 0) {
        day1Rain.innerHTML = `${day1RainValue}<span>mm</span>`
    } else {
        day1Rain.innerHTML = `<span>0mm</span>`
    }

    //Save correct days for weekly forecast cards as variables
    let weeklyDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; //Saves numbers 0-6 as days in an array

    let date0 = new Date(); //Gets current date
    let date1 = new Date(date0); //Sets date1 as current date
    date1.setDate(date1.getDate()+1); //Sets date1 as today + 1
    let day1Value = weeklyDays[date1.getDay(date1)]; //Sets day1Value as the value date1 in the weeklyDays array
    let date2 = new Date(date1);
    date2.setDate(date2.getDate()+1);
    let day2Value = weeklyDays[date2.getDay(date2)];
    let date3 = new Date(date2);
    date3.setDate(date3.getDate()+1);
    let day3Value = weeklyDays[date3.getDay(date3)];
    let date4 = new Date(date3);
    date4.setDate(date4.getDate()+1);
    let day4Value = weeklyDays[date4.getDay(date4)];
    let date5 = new Date(date4);
    date5.setDate(date5.getDate()+1);
    let day5Value = weeklyDays[date5.getDay(date5)];
    let date6 = new Date(date5);
    date6.setDate(date6.getDate()+1);
    let day6Value = weeklyDays[date6.getDay(date6)];
    let date7 = new Date(date6);
    date7.setDate(date7.getDate()+1);
    let day7Value = weeklyDays[date7.getDay(date7)];

    //Display correct days in weekly forecast cards
    let day1 = document.querySelector('.day1');
    day1.innerHTML = day1Value;
    let day2 = document.querySelector('.day2');
    day2.innerHTML = day2Value;
    let day3 = document.querySelector('.day3');
    day3.innerHTML = day3Value;
    let day4 = document.querySelector('.day4');
    day4.innerHTML = day4Value;
    let day5 = document.querySelector('.day5');
    day5.innerHTML = day5Value;
    let day6 = document.querySelector('.day6');
    day6.innerHTML = day6Value;
    let day7 = document.querySelector('.day7');
    day7.innerHTML = day7Value;
}



//Create date
function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day}, ${date} ${month} ${year}`;
}

//Display Date
let now = new Date();
let date = document.querySelector('.basicWeather .date');
date.innerText = dateBuilder(now);