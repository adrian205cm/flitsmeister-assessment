import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';

function App() {
  const [cities, setCities] = useState(JSON.parse(localStorage.getItem('cities')) || []);
  const [newCity, setNewCity] = useState('');

  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem('cities') || '[]');
    setCities(storedCities);
  }, []);

  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities]);



  const addCity = () => {
    if (newCity && !cities.includes(newCity)) {
      setCities([...cities, newCity]);
      setNewCity('');
    }
  };

  const removeCity = (cityName) => {
    setCities(cities.filter(city => city.name !== cityName));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="Enter city name"
          className="border p-2 mr-2"
        />
        <button 
          onClick={addCity}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add City
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cities.map((city, index) => (
          <WeatherCard
            key={index}
            city={city}
            weatherdata={city.fulldata}
            onRemove={() => removeCity(city.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;