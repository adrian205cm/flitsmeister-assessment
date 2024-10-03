import { useState, useEffect } from 'react';
import axios from 'axios';
import { WiDayCloudy, WiDayFog, WiDayLightning, WiDayRain, WiDaySnow, WiDaySprinkle, WiDaySunny, WiStrongWind, WiHumidity } from 'react-icons/wi';

// const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY = 'd0595002b3c37b445fd78bee61c06fa8';

function getWeatherIcon(weathertype) {
  if (weathertype == "Thunder") { return <WiDayRain></WiDayRain> }
  else if (weathertype == "Clouds") { return <WiDayCloudy></WiDayCloudy> }
  else if (weathertype == "Rain") { return <WiDayRain></WiDayRain> }
  else if (weathertype == "Snow") { return <WiDaySnow></WiDaySnow> }
  else if (weathertype == "Atmosphere") { return <WiDayFog></WiDayFog> }
  else if (weathertype == "Clear") { return <WiDaySunny></WiDaySunny> }
  else if (weathertype == "Clouds") { return <WiDayCloudy></WiDayCloudy> }
  else return <WiDaySprinkle></WiDaySprinkle>
}

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
      className="card relative group min-w-sm max-w-sm border border-gray-100 transition-shadow shadow-lg hover:shadow-shadow-xl w-full bg-flitsmeister text-purple-50 rounded-md">
      <button
        onClick={onRemove}
        className="absolute right-0 bg-red-500 text-white px-2 m-3 rounded transition opacity-0 group-hover:opacity-100"
      >
        Remove
      </button>
      <h2 className="text-md mb-2 px-4 pt-4">
        <div className="flex justify-between">
          <div className="badge relative top-0">
            <span className="mt-2 py-1 h-12px text-md font-semibold w-12px  rounded right-1 bottom-1 px-4">{city}</span>
          </div>
          <span className="text-lg font-bold ">
            {weather.localtime.getHours()}:{weather.localtime.getMinutes().toString().padStart(2, '0')}
          </span>
        </div>
      </h2>

      <div className="flex items-center p-4">
        <div className="flex justify-center items-center w-96 h-10 text-8xl">
          {getWeatherIcon(weather.weathermain)}
        </div>
      </div>
      <div className="text-md pt-4 pb-4 px-4">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <span className="flex space-x-2 items-center">
              <WiStrongWind></WiStrongWind>
              <span> {weather.windspeed}km/h </span>
            </span>
            <span className="flex space-x-2 items-center">
              <WiHumidity></WiHumidity>
              <span> {weather.humidity}%</span>
            </span>
          </div>
          <div>
            <h1 className="text-6xl"> {weather.temp}° </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;