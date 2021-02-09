const button = document.getElementById('generate');
const temperatureInCelsius = document.getElementById('temperature');
const dateDiv = document.getElementById('date');
const city = document.getElementById('city');
const dataHolder = document.getElementById('entry-holder');
const temperatureFeelsLike = document.getElementById('feels-like');

button.addEventListener('click', getWeather);

function getWeather () {
  const zip = document.getElementById('zip').value;
  dataHolder.classList.add('entry-holder');

  postZip('/getTemperatureForCity', {zip})
    .then(getFinalData);
}

//POST
const postZip = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const post = await res.json();
    return post;
  } catch (error) {
    console.log('error', error);
    console.log('something went wrong');
  }
}

const getFinalData = (finalData) => {
  console.log(finalData);
  dateDiv.innerHTML = `Date: ${finalData.date}`;
  city.innerHTML = `City: ${finalData.city}`;
  temperatureInCelsius.innerHTML = `Current: ${Math.round(finalData.temperatureInCelsius)}°C`;
  temperatureFeelsLike.innerHTML = `Feels Like: ${Math.round(finalData.feelsLike)}°C`;
};