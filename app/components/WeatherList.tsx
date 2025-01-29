import React from 'react';
import WeatherCard from './WeatherCard'; 
import { WeatherResponse } from '../types'; 

const WeatherList: React.FC<{ weatherData: WeatherResponse }> = ({ weatherData }) => {
    // Get hourly forecast 
    const hourlyForecasts = weatherData.list;
  
    // Select only one forecast per day, assuming the data is returned for 3-hour intervals.
    const dailyForecasts = hourlyForecasts.filter((_, index) => index % 8 === 0); // Every 8th entry is a new day.
  
    const formattedForecasts = dailyForecasts.map((forecast) => ({
      date: forecast.dt_txt, // Assuming dt_txt is the forecast date
      city: weatherData.city.name, // City name
      temp: forecast.main.temp,
      temp_min: forecast.main.temp_min,
      temp_max: forecast.main.temp_max,
      feelsLike: forecast.main.feels_like,
      humidity: forecast.main.humidity,
      windSpeed: forecast.wind.speed,
      weather: forecast.weather[0]?.description || "Unknown", // Assuming the first weather entry has the description
    }));
  
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {formattedForecasts.map((forecast, index) => (
            <div
              key={index}
              className={`${
                index === 0 ? 'col-span-1 sm:col-span-2' : 'sm:col-span-1'
              }`} // Make the first card full width, the rest half width
            >
              <WeatherCard weather={forecast} />
            </div>
          ))}
        </div>
      </div>
    );
  };

export default WeatherList;