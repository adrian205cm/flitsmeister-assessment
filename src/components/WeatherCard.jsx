import { useState, useEffect } from 'react';
import axios from 'axios';
import { WiDayCloudy, WiDayFog, WiDayLightning, WiDayRain, WiDaySnow, WiDaySprinkle, WiDaySunny, WiStrongWind, WiHumidity } from 'react-icons/wi';

// const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY = 'd0595002b3c37b445fd78bee61c06fa8';

function getWeatherIcon(weathertype) {
  if (weathertype === "Thunder") { return <WiDayLightning></WiDayLightning> }
  else if (weathertype === "Clouds") { return <WiDayCloudy></WiDayCloudy> }
  else if (weathertype === "Rain") { return <WiDayRain></WiDayRain> }
  else if (weathertype === "Snow") { return <WiDaySnow></WiDaySnow> }
  else if (weathertype === "Atmosphere") { return <WiDayFog></WiDayFog> }
  else if (weathertype === "Clear") { return <WiDaySunny></WiDaySunny> }
  else if (weathertype === "Clouds") { return <WiDayCloudy></WiDayCloudy> }
  else return <WiDaySprinkle></WiDaySprinkle>
}

const WeatherCard = ({ city, onRemove, onSelect }) => {
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
          country: response.data.sys.country,
          temp: Math.floor(response.data.main.temp),
          description: response.data.weather[0].description,
          weathercode: response.data.weather[0].id,
          weathermain: response.data.weather[0].main,
          humidity: response.data.main.humidity,
          windspeed: Math.floor(response.data.wind.speed),
          winddirection: response.data.wind.deg,
          datetime: new Date((response.data.dt - 7200) * 1000),
          localtime: new Date((response.data.dt - 7200 + response.data.timezone) * 1000)
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
    return (
      <div 
        className="bg-red-200 shadow-md rounded-lg p-4 m-2 cursor-pointer hover:bg-red-400 transition"
        onClick={onRemove}
    >
        Invalid location. Please remove and try again.
      </div>
    );
  }

  return (
    <div
      className="relative group  bg-gray-100 has-[:checked]:bg-blue-100 px-6 py-4 border-b border-gray-300">
      <button
        onClick={onRemove}
        className="absolute right-0 bg-red-500 text-white px-2 m-3 rounded transition opacity-0 group-hover:opacity-100"
      >
        Remove
      </button>

      <label className="flex items-center w-full ml-2 cursor-pointer has-[:checked]:bg-indigo-200">
        <input 
          type="radio" 
          name="selectedcity" 
          value={city} 
          onChange={onSelect}
        />
        <div className="flex flex-col pl-2">
          <h2 className="font-medium text-sm">{city}, {weather.country}</h2>
          <h3 className="text-gray-500 text-sm">{weather.temp}°</h3>
        </div>

        <div className="flex ml-auto justify-center items-center text-8xl text-gray-400">
          {getWeatherIcon(weather.weathermain)}
        </div>
      </label>
    </div>

      
  );
};

export default WeatherCard;