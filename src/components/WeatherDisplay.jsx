import React, { useState, useEffect, useRef } from 'react';

// Importiere die Dateien aus dem src-Ordner
import cloudyVideo from '../cloudy.mp4';
import iceVideo from '../ice.mp4';
import foggyVideo from '../foggy.mp4';
import lightningVideo from '../lightning.mp4';
import rainVideo from '../rain.mp4';
import snowVideo from '../snow.mp4';
import sunnyImage from '../sunny.jpg';

const WeatherDisplay = ({ lat, lon, city, unit }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [localTime, setLocalTime] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    let apiUrl = '';
    const apiKey = 'f593fd275477df03bb93a759f1cffa69';

    if (city) {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    } else if (lat && lon) {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    }

    if (apiUrl) {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Stadt nicht gefunden');
          }
          return response.json();
        })
        .then((data) => {
          setWeather(data);
          setError(null);

          setLocalTime(new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }));

          const weatherCondition = data.weather[0].main.toLowerCase();
          
          // Videoquelle basierend auf dem Wetter aktualisieren
          switch (weatherCondition) {
            case "clouds":
              setVideoSrc(cloudyVideo);
              break;
            case "broken clouds":
              setVideoSrc(iceVideo);
              break;
            case "mist":
              setVideoSrc(foggyVideo);
              break;
            case "thunderstorm":
              setVideoSrc(lightningVideo);
              break;
            case "rain":
            case "drizzle":
              setVideoSrc(rainVideo);
              break;
            case "snow":
              setVideoSrc(snowVideo);
              break;
            case "clear":
              setVideoSrc(sunnyImage);
              break;
            default:
              setVideoSrc("");
          }
        })
        .catch((error) => {
          setWeather(null);
          setError('Stadt nicht gefunden!');
        });
    }
  }, [lat, lon, city, unit]);

  useEffect(() => {
    if (videoRef.current && videoSrc.endsWith('.mp4')) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [videoSrc]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!weather) {
    return <div>Lädt...</div>;
  }

  return (
    <div className="weather-info">
      <h2>
        {weather.name} <span className="local-time">({localTime})</span>
      </h2>
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

      {/* Video oder Bild anzeigen */}
      {videoSrc && videoSrc.endsWith('.mp4') ? (
        <video ref={videoRef} className="weather-video" autoPlay loop muted>
          <source src={videoSrc} type="video/mp4" />
          Dein Browser unterstützt keine Videos.
        </video>
      ) : videoSrc && videoSrc.endsWith('.jpg') ? (
        <img className="weather-image" src={videoSrc} alt="Weather Background" />
      ) : null}
    </div>
  );
};

export default WeatherDisplay;
