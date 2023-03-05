const form = document.querySelector('form');
const input = document.querySelector('#location');
const weatherDiv = document.querySelector('#weather');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = input.value;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=88a9a916b6fc327c0f812ce07d083e18`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const forecast = data.list;
      let weatherHtml = '';
      forecast.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const time = date.toLocaleTimeString('en-US', { timeStyle: 'short' });
        const temp = Math.round(item.main.temp);
        let color = '';
        if (temp <= -50) {
          color = '#060066'; // blue
        } else if (temp > -50 && temp <= -30) {
          color = '#070076'; // darker
        } else if (temp > -30 && temp <= -15) {
          color = '#080085'; // dark
        } else if (temp > -15 && temp <= 0) {
          color = '#0B00B9'; // d
        } else if (temp > 0 && temp <= 25) {
          color = '#003AFF'; // even darker blue
        } else if (temp > 25 && temp <= 40) {
          color = '#0078FF'; // dark blue
        } else if (temp > 40 && temp <= 49) {
          color = '#00D1FF'; // lighter blue
        } else if (temp > 49 && temp <= 59) {
          color = '#C0EEBA'; // green sorta color
          } else if (temp > 59 && temp <= 70) {
          color = '#ffd500'; // yellow
        } else if (temp > 70 && temp <= 84) {
         color = '#FC7F40';// orange  fc7f40
        } else if (temp > 84 && temp <= 110) {
         color = '#FF3600';// orange  fc7f40
        }
        weatherHtml += `
          <div class="item" style="background-color: ${color}">
            <div class="day">${day}</div>
            <div class="time">${time}</div>
            <div class="temp">${temp}°F</div>
            <br>
          </div>
        `;
      });
      weatherDiv.innerHTML = weatherHtml;
    })
    .catch(error => {
      console.log(error);
      weatherDiv.innerHTML = "Error: Invalid location";
    });
  input.value = '';
});
function setWeatherBackground(weatherData) {
  let weatherCode = weatherData.weather[0].id;

  if (weatherCode >= 200 && weatherCode < 300) {
    // Thunderstorm
    document.body.style.backgroundImage = "url('https://source.unsplash.com/n1yRoi4KvW8/1600x900')";
  } else if (weatherCode >= 300 && weatherCode < 400) {
    // Drizzle
    document.body.style.backgroundImage = "url('https://source.unsplash.com/nvzvOPQW0gc/1600x900')";
  } else if (weatherCode >= 500 && weatherCode < 600) {
    // Rain
    document.body.style.backgroundImage = "url('https://source.unsplash.com/_UlktXM9KkM/1600x900')";
  } else if (weatherCode >= 600 && weatherCode < 700) {
    // Snow
    document.body.style.backgroundImage = "url('https://source.unsplash.com/gpzoOOJXbTc/1600x900')";
  } else if (weatherCode >= 700 && weatherCode < 800) {
    // Atmosphere
    document.body.style.backgroundImage = "url('https://source.unsplash.com/LXGhVYJYsek/1600x900')";
  } else if (weatherCode === 800) {
    // Clear
    document.body.style.backgroundImage = "url('https://source.unsplash.com/5yP83RhaFGA/1600x900')";
  } else if (weatherCode > 800 && weatherCode < 900) {
    // Clouds
    document.body.style.backgroundImage = "url('https://source.unsplash.com/7Zl6nZspzYY/1600x900')";
  } else {
    // Default
    document.body.style.backgroundColor = "#fff";
  }
}
