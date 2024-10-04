import { WiDayCloudy, WiDayFog, WiDayLightning, WiDayRain, WiDaySnow, WiDaySprinkle, WiDaySunny } from 'react-icons/wi';

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

const WeatherCard = ({ city, weatherdata, onRemove, onSelect }) => {
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
          <h2 className="font-medium text-sm">{city}{weatherdata && ', ' + weatherdata.fulldata.sys.country}</h2>
          <h3 className="text-gray-500 text-sm">{weatherdata && Math.floor(weatherdata.temp)+'°'}</h3>
        </div>

        <div className="flex ml-auto justify-center items-center text-8xl text-gray-400">
          {weatherdata && getWeatherIcon(weatherdata.fulldata.weather[0].main)}
        </div>
      </label>
    </div>
      
  );
};

export default WeatherCard;