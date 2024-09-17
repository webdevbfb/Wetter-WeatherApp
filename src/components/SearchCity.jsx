import React, { useState } from 'react';

const SearchCity = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      onSearch(city);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Stadt eingeben..."
        />
        <button type="submit">Suche</button>
      </form>
    </div>
  );
};

export default SearchCity;
