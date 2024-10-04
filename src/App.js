import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';

function App() {
  const [cities, setCities] = useState(JSON.parse(localStorage.getItem('cities')) || []);
  const [newCity, setNewCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem('cities') || '[]');
    setCities(storedCities);
  }, []);

  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities]);



  const addCity = (e) => {
    if (newCity && !cities.includes(newCity)) {
      setCities([...cities, newCity]);
      setNewCity('');
    }
    e.preventDefault();
  };

  const removeCity = (cityToRemove) => {
    setCities(cities.filter(city => city !== cityToRemove));
  };
  const selectCity = (cityToSelect) => {
    setSelectedCity(cityToSelect);
  };

  return (
    <>
      <div className="h-screen w-screen bg-blue-400 overflow-hidden absolute flex items-center">
        <div className="w-screen h-64 absolute top-0 opacity-50 left-0 -my-40 -mx-64 bg-blue-300 rounded-full"></div>
        <div className="w-64 h-64 -mx-32 bg-blue-300 opacity-50 rounded-full"></div>
        <div className="w-64 h-64 ml-auto relative opacity-50 -mr-32 bg-blue-300 rounded-full"></div>
        <div className="w-screen h-64 absolute opacity-50 bottom-0 right-0 -my-40 -mx-64 bg-blue-300 rounded-full"></div>
      </div>
      <div className="container mx-auto h-screen py-16 px-8 relative">
        <div className="flex w-full rounded-lg h-full lg:overflow-hidden overflow-auto lg:flex-row flex-col shadow-2xl">
          <div className="lg:w-1/2 bg-white text-gray-800 flex flex-col">
            <div className="p-8 shadow-md relative bg-white">
              <h1 className="font-medium text-lg mt-6">Flitsmeister weather</h1>
              <form className="mt-6 flex" onSubmit={addCity}>
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  placeholder="Enter city name"
                  className="border p-2 mr-2"
                />

                <button 
                  onClick={addCity}
                  className="bg-green-500 text-white py-2 text-sm px-3 rounded focus:outline-none"
                >
                  Add City
                </button>
              </form>
            </div>
            <div className="overflow-auto flex-grow">
              {cities.map((city, index) => (
                <WeatherCard
                  key={index}
                  city={city}
                  weatherdata={city.fulldata}
                  onRemove={() => removeCity(city)}
                  onSelect={() => selectCity(city)}
                />
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 bg-blue-600 text-white flex flex-col">
              {selectedCity}
          </div>
        </div>

      </div>
    </>
  );
}

export default App;