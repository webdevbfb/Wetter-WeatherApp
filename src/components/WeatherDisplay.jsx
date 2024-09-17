import React, { useState, useEffect } from 'react';

const WeatherDisplay = ({ lat, lon, city, unit }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    let apiUrl = '';
    const apiKey = 'f593fd275477df03bb93a759f1cffa69'; // Setze hier deinen API-Key ein

    if (city) {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    } else if (lat && lon) {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    }

    if (apiUrl) {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setWeather(data))
        .catch((error) => console.error('Fehler:', error));
    }
  }, [lat, lon, city, unit]);

  if (!weather) {
    return <div>Lädt...</div>;
  }

  return (
    <div>
      <h1>{weather.name}</h1>
      <p>Temperatur: {weather.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
      <p>Beschreibung: {weather.weather[0].description}</p>
      <p>Wind: {weather.wind.speed} m/s</p>
      <p>Luftfeuchtigkeit: {weather.main.humidity}%</p>
    </div>
  );
};

export default WeatherDisplay;
