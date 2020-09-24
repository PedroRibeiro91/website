const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");


const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function weatherByLocation(city){
    const resp = await fetch(url(city));
    const respData = await resp.json();

    showWeather(respData);
}

function showWeather(data){
    const temperature = kelvinToCelsius(data.main.temp);

    const weather = document.createElement('div');

    weather.classList.add("weather");

    weather.innerHTML = `
        <h2>${temperature}ºC</h2>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"/>
    `;
    main.innerHTML ="";
    main.appendChild(weather);

}

function kelvinToCelsius(k){
    return Math.floor(k-273.15);
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const city = search.value;

    if(city){
        weatherByLocation(city);
    }
} );







