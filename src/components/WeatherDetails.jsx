import React from 'react'
import { WiDayCloudy, WiDayFog, WiDayLightning, WiDayRain, WiDaySnow, WiDaySprinkle, WiDaySunny, WiHumidity, WiWindDeg, WiStrongWind } from 'react-icons/wi';

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

const WeatherDetails = ({selectedcity, weatherdata}) => {
  if (!weatherdata) return false

  return (
    <>
      <div className="p-8 bg-blue-700 flex items-center relative">
        <div className="mr-auto">
          <h1 className="text-xl leading-none mb-1">{selectedcity}</h1>
          <h2 className="text-blue-400 text-sm">{weatherdata.fulldata.sys.country}</h2>
        </div>
        <span className="text-white text-4xl py-2 pr-8 relative z-10">{weatherdata.temp}°</span>
        <div className="text-8xl text-blue-500 absolute right-4">
          {weatherdata && getWeatherIcon(weatherdata.fulldata.weather[0].main)}
        </div>
      </div>
      <div className="p-8 flex flex-1 items-start overflow-auto bg-blue-500">
        
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white"><WiHumidity className='inline text-3xl mr-1' />Humidity</dt>
            <dd className="mt-1 text-sm leading-6 text-blue-100 sm:col-span-2 sm:mt-0">{weatherdata.fulldata.main.humidity}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white"><WiStrongWind className='inline text-3xl mr-1' />Windspeed</dt>
            <dd className="mt-1 text-sm leading-6 text-blue-100 sm:col-span-2 sm:mt-0">{weatherdata.fulldata.wind.speed}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white"><WiWindDeg className='inline text-3xl mr-1' />Wind direction</dt>
            <dd className="mt-1 text-sm leading-6 text-blue-100 sm:col-span-2 sm:mt-0">{weatherdata.fulldata.wind.deg}</dd>
          </div>
        </dl>

      </div>
    </>
  );
}

export default WeatherDetails