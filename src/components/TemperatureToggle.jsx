import React from 'react';

const TemperatureToggle = ({ unit, setUnit }) => {
  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div>
      <button onClick={toggleUnit}>
        In {unit === 'metric' ? 'Fahrenheit' : 'Celsius'} umschalten
      </button>
    </div>
  );
};

export default TemperatureToggle;
