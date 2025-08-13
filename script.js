const apiKey = "78e37788515c42b793a710090a9aa2e5";

async function getWeather() {
    const city = document.getElementById("city").value.trim();
    if (!city) {
        document.getElementById("weatherResult").innerHTML = "Please enter a city name.";
        return;
    }
    fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
            },
            () => {
                document.getElementById("weatherResult").innerHTML = "Location access denied.";
            }
        );
    } else {
        document.getElementById("weatherResult").innerHTML = "Geolocation not supported.";
    }
}

async function fetchWeatherData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            document.getElementById("weatherResult").innerHTML = data.message;
            return;
        }

        document.getElementById("weatherResult").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡 Temperature: ${data.main.temp}°C</p>
      <p>☁ Condition: ${data.weather[0].description}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
    `;
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = "Error fetching data.";
    }
}