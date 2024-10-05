/** @format */

const apiKey = '3c02d6c14753359e454ae7d2c9b6dce0';

// ambil element html yang diperlukan

const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weather-icon');

// function untuk mendapatkan cuaca dari openweather
async function getWeather(latitude, longitude) {
	const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

	try {
		const response = await fetch(apiURL);
		const data = await response.json();

        locationElement.textContent = `${data.name}, ${data.sys.country}`
        temperatureElement.textContent = `Temperature: ${data.main.temp} °C`
        descriptionElement.textContent = `Description: ${data.weather[0].description}`

        const iconCode = data.weather[0].icon
        weatherIconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon">`


	} catch (error) {
		console.error('Error fetching weather data: ');
		alert('Failed to fetch weather data. Please try again later');
	}
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            getWeather(latitude, longitude)
        }, error => {
            alert('Failed to get your location. Please Enable location services')
        });
	} else {
        alert('Geolocation is not supported by your browser')
    }
}

// memanggil fungsi getLocation ketika halaman dimuat
window.onload = getLocation
