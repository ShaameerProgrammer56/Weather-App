const weatherForm = document.querySelector(".form");
const city = document.querySelector(".City");
const card = document.querySelector(".card");
const apikey = "de08f43ac9c8d036586b4370c3ee123b";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const cityName = city.value.trim();

    if (cityName) {
        try {
            const WeatherData = await weather(cityName);
            displayWeatherInfo(WeatherData); // You will define this function
        } catch (error) {
            console.error(error);
            displayError("Failed to fetch weather data.");
        }
    } else {
        displayError("Please Enter A City");
    }
});

async function weather(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("City not found");
    }
    const data = await response.json();
    return data;
}

function displayWeatherInfo(data) {
    card.textContent = ""; // Clear previous content
    card.style.display = "flex";

    const info = document.createElement("p");
    info.innerHTML = `
        <strong>${data.name}</strong><br>
        Temperature: ${data.main.temp}°C<br>
        Weather: ${data.weather[0].description}
    `;
    card.appendChild(info);
}

function displayError(message) {
    const error = document.createElement("p");
    error.textContent = message;
    error.classList.add("Error");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(error);
}
