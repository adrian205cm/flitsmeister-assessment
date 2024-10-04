import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';
import axios from 'axios';
const API_KEY = 'd0595002b3c37b445fd78bee61c06fa8';

function App() {
  const [cities, setCities] = useState(JSON.parse(localStorage.getItem('cities')) || []);
  const [newCity, setNewCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [citiesWeather, setCitiesWeather] = useState([]);

  
  // EFFECTS
  useEffect(() => { // FETCH storedcities weatherdata
    const loadCities = async () => {
      const storedCities = JSON.parse(localStorage.getItem('cities') || '[]');
      setCities(storedCities);

      const weatherPromises = storedCities.map(city => 
        fetchWeatherData(city)
      );
      const weatherData = await Promise.all(weatherPromises);
      setCitiesWeather(weatherData.filter(data => data !== null));
      setLoading(false);
    };
    loadCities();
  }, []);

  
  useEffect(() => { // set stored cities to localstorage
    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities, loading]);


  // HANDLERS
  const addCity = async(e) => {
    e.preventDefault();
    if (newCity && !cities.includes(newCity)) {
      const weatherData = await fetchWeatherData(newCity);
      if (weatherData) {
        setCities([...cities, newCity]);
        setNewCity('');
        console.log(weatherData);
        setCitiesWeather([...citiesWeather, weatherData]);
      } else {
        alert('Invalid location');
      }
    }
  };

  const removeCity = (cityToRemove) => {
    setCities(cities.filter(city => city !== cityToRemove));
    setCitiesWeather(citiesWeather.filter(city => city.name !== cityToRemove));
  };

  const selectCity = (cityToSelect) => {
    setSelectedCity(cityToSelect);
  };

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
      return {
        name: cityName,
        temp: response.data.main.temp,
        description: response.data.weather[0].description,
        fulldata: response.data
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
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
                  weatherdata={citiesWeather.filter(cityname => cityname.name === city)[0]}
                  onRemove={() => removeCity(city)}
                  onSelect={() => selectCity(city)}
                />
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 bg-blue-600 text-white flex flex-col">
              {loading 
                ? <p>Loading</p> 
                : <WeatherDetails selectedcity={selectedCity} weatherdata={citiesWeather.filter(city => city.name === selectedCity)[0]} />
              }
          </div>
        </div>

      </div>
    </>
  );
}

export default App;