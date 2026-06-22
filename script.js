const apiKey = "03f16d9431da460c900142606253011"; 
const apiUrl = "https://api.weatherapi.com/v1/";

document.getElementById('searchButton').addEventListener('click', fetchWeather);

function fetchWeather() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) return;

    fetch(`${apiUrl}current.json?key=${apiKey}&q=${city}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert("City not found");
                return;
            }
           
            updateWeatherInfo(data);
            fetchForecast(city);
        })
        .catch(err => console.log("Error:", err));
}

function updateWeatherInfo(data) {
    document.getElementById("cityName").innerText = data.location.name;
    document.getElementById("weatherDescription").innerText = data.current.condition.text;
    document.getElementById("temperature").innerText = `Temperature: ${data.current.temp_c} °C`;
    document.getElementById("humidity").innerText = `Humidity: ${data.current.humidity}%`;
    document.getElementById("windSpeed").innerText = `Wind Speed: ${data.current.wind_kph} km/h`;

    const condition = data.current.condition.text.toLowerCase();
    const bg = document.querySelector(".background-container");

    if (condition.includes("sun") || condition.includes("clear")) {
        bg.style.backgroundImage = "url('https://i.imgur.com/YB0DkK8.jpg')";
    } else if (condition.includes("cloud")) {
        bg.style.backgroundImage = "url('https://i.imgur.com/95oB2uv.jpg')";
    } else if (condition.includes("rain")) {
        bg.style.backgroundImage = "url('https://i.imgur.com/E3Dk7dV.jpg')";
    } else {
        bg.style.backgroundImage = "url('https://i.imgur.com/2a3iQ7m.jpg')";
    }
}

function fetchForecast(city) {
    fetch(`${apiUrl}forecast.json?key=${apiKey}&q=${city}&days=5`)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("forecastContainer");
            container.innerHTML = "";

            data.forecast.forecastday.forEach(day => {
                const div = document.createElement("div");
                div.className = "forecast-item";

                div.innerHTML = `
                    <p>${day.date}</p>
                    <p>${day.day.condition.text}</p>
                    <p>Temp: ${day.day.avgtemp_c} °C</p>
                `;

                container.appendChild(div);
            });
        });
}
