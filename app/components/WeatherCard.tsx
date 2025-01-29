
import { CloudRain, Sun, Cloud, Droplet, Wind, CloudLightning, SunSnow } from 'lucide-react';

import React from 'react';
import { WeatherCardProps } from '../types';

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  // Format the date as "Day of the week, Month dd, yyyy"
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',   // e.g., Monday
    year: 'numeric',   // e.g., 2025
    month: 'long',     // e.g., January
    day: '2-digit',    // e.g., 28
  }).format(new Date(weather.date));

  // Get the simplified weather condition
  const getSimplifiedCondition = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain')) return 'Rain';
    if (conditionLower.includes('cloud')) return 'Clouds';
    if (conditionLower.includes('clear')) return 'Clear Sky';
    if (conditionLower.includes('snow')) return 'Snow';
    if (conditionLower.includes('thunderstorm')) return 'Thunderstorm';
    return 'Cloud';  // Default fallback
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear sky':
        return <Sun className="w-10 h-10 text-yellow-500" />;
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
        return <Cloud className="w-10 h-10 text-gray-400" />;
      case 'shower rain':
      case 'light rain':
      case 'rain':
        return <CloudRain className="w-10 h-10 text-blue-600" />;
      case 'thunderstorm':
        return <CloudLightning className="w-10 h-10 text-yellow-600" />;
      case 'snow':
        return <SunSnow className="w-10 h-10 text-white" />;
      default:
        return <Cloud className="w-10 h-10 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white rounded-lg text-gray-800 flex flex-col w-full shadow-md">
      {/* City and Date */}
      <div className="bg-red-300 text-black p-3 rounded-t-lg font-mono border-b-2">
        <p>{formattedDate}</p>
      </div>

      {/* Weather Icon and Main Details */}
      <div className="flex flex-col items-start gap-4 p-6">
        <div className="flex items-start gap-2">
          {getWeatherIcon(weather.weather)}
          <p className="text-xl p-2 font-mono ">
            {weather.temp}°C  {getSimplifiedCondition(weather.weather)}
          </p>
        </div>
        <p className="text-sm p-2 ">
        {weather.weather} ~ High: {weather.temp_max}°C   ~  Low: {weather.temp_min}°C 
        </p>
      </div>

      {/* Full Weather Description and Additional Stats */}
      <div className="flex px-4 gap-8 pb-2 pt-2 text-sm text-gray-500 bg-gray-300 justify-between font-mono">
        <p className="flex items-center gap-2">
          <Droplet className="w-4 h-4 text-blue-400" /> Humidity: {weather.humidity}%
        </p>
        <p className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-white" /> Wind: {weather.windSpeed} km/h
        </p>
        <p>Feels Like: {weather.feelsLike}°C</p>
      </div>

     
    </div>
  );
};

export default WeatherCard;
