import React, { useState, useEffect, useRef } from 'react';

const WeatherDisplay = ({ lat, lon, city, unit }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);  // Für Fehlerzustände
  const [videoSrc, setVideoSrc] = useState("");  // Videoquelle als Zustand
  const [localTime, setLocalTime] = useState(""); // Zustand für die lokale Zeit
  const videoRef = useRef(null);

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
        .then((response) => {
          if (!response.ok) {
            throw new Error('Stadt nicht gefunden');
          }
          return response.json();
        })
        .then((data) => {
          setWeather(data);
          setError(null);  // Kein Fehler

          // Berechne die lokale Zeit der Stadt basierend auf der Zeitzonenverschiebung
          // const timezoneOffsetInSeconds = data.timezone; // Zeitzonenverschiebung in Sekunden
          // const localTimeInMs = new Date().getTime() + timezoneOffsetInSeconds * 1000; // Berechnung der aktuellen Zeit in Millisekunden
          // const localTimeDate = new Date(localTimeInMs); // Datum und Zeit der Stadt

          // Setze die Zeit im Zustand in einem gut lesbaren Format
          setLocalTime(new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }));

          // Videoquelle basierend auf dem Wetter aktualisieren
          const weatherCondition = data.weather[0].main.toLowerCase();
          
          switch (weatherCondition) {
            case "clouds":
              setVideoSrc("/cloudy.mp4");
              break;
            case "broken clouds":
              setVideoSrc("/ice.mp4");
              break;
            case "mist":
              setVideoSrc("/foggy.mp4");
              break;
            case "thunderstorm":
              setVideoSrc("/lightning.mp4");
              break;
            case "rain":
            case "drizzle":
              setVideoSrc("/rain.mp4");
              break;
            case "snow":
              setVideoSrc("/snow.mp4");
              break;
            case "clear":
              setVideoSrc("/sunny.jpg");
              break;
            default:
              setVideoSrc("");  // Kein Video, wenn keine passende Bedingung vorliegt
          }
        })
        .catch((error) => {
          setWeather(null);
          setError('Stadt nicht gefunden!');
        });
    }
  }, [lat, lon, city, unit]);

  useEffect(() => {
    if(videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [videoSrc])

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

      {/* Video oder Bild anzeigen, wenn vorhanden */}
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
