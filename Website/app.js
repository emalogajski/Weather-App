const button = document.getElementById('generate');
const temp = document.getElementById('temp');
const weatherKey = '&APPID=83554d52ea1a5c26781557de01e3b182&units=metric';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let d = new Date();
let date = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const contentDiv = document.getElementById('content');
const dateDiv = document.getElementById('date');

button.addEventListener('click', getWeather);

function getWeather (e) {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  getData(baseURL, zip, weatherKey) 
  .then(function(data) {
    console.log(data);
    return postData('/getdata', {temp: data.main.temp, date, zip, feelings});
  })
  .then(getFinalData);
}

  const getData = async (baseURL, zip, weatherKey) => {

    const res = await fetch(`${baseURL}${zip}${weatherKey}`)
    try {
      const data = await res.json();
      return data;
    } catch(error) {
      console.log("error", error);
    }
  };

//POST
const postData = async (url = '', data = {}) => {
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
      console.log("something went wrong");
    }
}

const getFinalData = async () => {

  const res = await fetch('/all')
  try {
    const finalData = await res.json();
    dateDiv.innerHTML = 'Date: ' + finalData.date;
    contentDiv.innerHTML = 'Feelings: ' + finalData.feelings;
    temp.innerHTML = 'Current Temperature (C): ' + finalData.temp;
    return finalData;
  } catch(error) {
    console.log("error", error);
  }
};