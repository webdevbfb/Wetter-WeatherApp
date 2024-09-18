import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherDisplay from "./components/WeatherDisplay";
import SearchCity from "./components/SearchCity";
import TemperatureToggle from "./components/TemperatureToggle";
import Footer from "./components/Footer";

const App = () => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [city, setCity] = useState(null);
  const [unit, setUnit] = useState("metric"); // 'metric' für Celsius, 'imperial' für Fahrenheit
  const [isLightMode, setIsLightMode] = useState(false);

  const toggleMode = () => {
    setIsLightMode(prevMode => !prevMode);
    document.body.classList.toggle('light-mode', !isLightMode);
  };

  // Holt den aktuellen Standort des Benutzers
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }, []);

  // Funktion, um die Stadt zu suchen
  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  return (
    <div className="box">
      <h1>Wetter App<button onClick={toggleMode} className="mode-toggle">
        {isLightMode ? (
          <i className="fa-solid fa-moon"></i>  // Nacht-Icon anzeigen
        ) : (
          <i className="fa-solid fa-sun"></i>   // Tag-Icon anzeigen
        )}
        {isLightMode ? "" : ""}
      </button><i class="fa-solid fa-cloud-sun-rain"></i></h1>
      <div className="card">
        {/* Komponente für die Suche nach einer Stadt */}
        <SearchCity onSearch={handleSearch} />

        {/* Komponente zum Umschalten der Temperatureinheit */}
        <TemperatureToggle unit={unit} setUnit={setUnit} />

        {/* Komponente zur Anzeige des aktuellen Wetters */}
        {city ? (
          <WeatherDisplay city={city} unit={unit} />
        ) : (
          lat && lon && <WeatherDisplay lat={lat} lon={lon} unit={unit} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
