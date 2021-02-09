const dotenv = require('dotenv');
dotenv.config();

const weatherKey = process.env.WEATHER_API_KEY;
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const getFormattedDate = () => {
  const newDate = new Date(); 
  return `${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()}`;
}

const axios = require('axios');

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors()); 

app.use(express.static('website'));

const port = 3000;

app.listen(port, listening);

function listening () {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}

const projectData = [];

app.post('/getTemperatureForCity', receiveZip);

async function getTemperature(zip) {
  try {
    const response = await axios.get(`${baseURL}${zip}${weatherKey}`);
    console.log(response);
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

async function receiveZip (req, res) {
  const zip = req.body.zip;
    
  const data = await getTemperature(zip);
  const newestWeatherData = {
    temperatureInCelsius: data.main.temp,
    zip,
    id: Math.floor(Math.random() * 1000),
    date: getFormattedDate(),
    city: data.name,
    feelsLike: data.main.feels_like,
  };
  projectData.push(newestWeatherData);
  res.send(newestWeatherData);
}

app.get('/allData', getData)

function getData(_, res) {
  res.send(projectData);
}