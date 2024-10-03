import { useState, useEffect } from 'react';
import axios from 'axios';
// const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY = 'd0595002b3c37b445fd78bee61c06fa8';


const WeatherCard = ({ city, onRemove }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchWeatherData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
          setWeather({
            temp: response.data.main.temp,
            description: response.data.weather[0].description
          });
          setError(null);
        } catch (err) {
          setError('Failed to fetch weather data');
          setWeather(null);
        } finally {
          setLoading(false);
        }
      };
  
      fetchWeatherData();
    }, [city]);
  
    if (loading) {
      return <div className="bg-white shadow-md rounded-lg p-4 m-2">Loading...</div>;
    }
  
    if (error) {
      return <div className="bg-white shadow-md rounded-lg p-4 m-2">{error}</div>;
    }
  
    return (
      <div className="bg-white shadow-md rounded-lg p-4 m-2">
        <h2 className="text-xl font-bold">{city}</h2>
        {weather && (
          <>
            <p className="text-lg">{weather.temp}°C</p>
            <p>{weather.description}</p>
          </>
        )}
        <button 
          onClick={onRemove} 
          className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          Remove
        </button>
      </div>
    );
  };
  
  export default WeatherCard;