const apiKey = '-----Add Your API KEY From open waether map -----'; // Replace with your OpenWeatherMap API Key
// webiste ---> https://openweathermap.org
// Function to get weather by user's current location
function getWeatherByLocation(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => updateWeatherData(data))
    .catch(error => console.log(error));
}

// Function to get weather by city input
function getWeatherByCity() {
  const city = document.getElementById('city').value;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => updateWeatherData(data))
    .catch(error => console.log(error));
}

// Function to update the weather data on the page
function updateWeatherData(data) {
  const cityName = data.name;
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  // Update HTML
  document.getElementById('city-name').innerText = `City: ${cityName}`;
  document.getElementById('temperature').innerText = `Temperature: ${temperature} °C`;
  document.getElementById('description').innerText = `Condition: ${description}`;
  document.getElementById('weather-icon').src = weatherIcon;

}

// Get user location and weather data on page load
window.onload = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByLocation(lat, lon);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};
