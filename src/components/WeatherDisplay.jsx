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

  // Bestimme, welches Video angezeigt wird
  const weatherCondition = weather.weather[0].main.toLowerCase();
  let videoSrc = "";

  if (["clouds", "clear"].includes(weatherCondition)) {
    videoSrc = "/cloudy_sunny.mp4"; // Wolkig oder sonnig
  } else if (["rain", "snow"].includes(weatherCondition)) {
    videoSrc = "/rain_snow.mp4"; // Regen oder Schnee
  }

  return (
    <div className="weather-info">
      <h2>{weather.name}</h2>
      <div className="weather-icon">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Weather Icon"
        />
      </div>
      <p className="temperature">{weather.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
      <p>Beschreibung: {weather.weather[0].description}</p>
      <p>Wind: {weather.wind.speed} m/s</p>
      <p>Luftfeuchtigkeit: {weather.main.humidity}%</p>

      {/* Video abhängig vom Wetter */}
      {videoSrc && (
        <video className="weather-video" autoPlay loop muted>
          <source src={videoSrc} type="video/mp4" />
          Dein Browser unterstützt keine Videos.
        </video>
      )}
    </div>
  );
};

export default WeatherDisplay;
