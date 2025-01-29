

'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WeatherCard from './components/WeatherCard';
import { WeatherResponse } from './types';
import { getForecastByCity } from './api/weather/route';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState('');

  // Fetch weather data
  const fetchWeather = async (city: string) => {
    setError(''); // Clear any existing errors

    try {
      const data = await getForecastByCity(city);
      console.log("Fetched weather data:", data); // Log the full data to check its structure
      setWeatherData(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Unable to fetch weather data. Please try again.');
    }
  };

  // Load default weather for Sydney on initial load
  useEffect(() => {
    fetchWeather('Sydney');
  }, []);

  // Function to get every 8th forecast entry (8-hour intervals)
  const getHourlyForecasts = (data: WeatherResponse) => {
    const hourlyForecasts = data.list.filter((_, index) => index % 8 === 0); // Filter every 8th entry
    return hourlyForecasts;
  };

  const hourlyForecasts = weatherData ? getHourlyForecasts(weatherData) : [];
  console.log("Hourly forecasts:", hourlyForecasts); // Log the hourly forecasts for debugging

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar onSearch={fetchWeather} />
      <div className="container mx-auto p-4">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {weatherData && (
          <div className="mt-8">
            {/* City Name */}
            <div className="text-center text-3xl pb-3 font-bold font-mono">{weatherData.city.name}</div>

            {/* Display Hourly Weather Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {hourlyForecasts.map((forecast, index) => (
                <WeatherCard
                  key={index}
                  weather={{
                    date: forecast.dt_txt, // Display the date and time
                    city: weatherData.city.name,
                    temp: forecast.main.temp,
                    temp_min: forecast.main.temp_min,
                    temp_max: forecast.main.temp_max,
                    feelsLike: forecast.main.feels_like,
                    humidity: forecast.main.humidity,
                    windSpeed: forecast.wind.speed,
                    weather: forecast.weather[0].description,
                    timestamp: new Date(forecast.dt * 1000).toLocaleString(), // Add timestamp
                  }}
                  isToday={false} // For simplicity, we assume it's not "today" (you can add custom logic if needed)
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
