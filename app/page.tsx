
'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WeatherList from './components/WeatherList'; 
import { WeatherResponse } from './types';

import { AxiosError } from 'axios'; 

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string>(''); // Typing error as string

  // Fetch weather data
  const fetchWeather = async (city: string) => {
    setError(''); // Clear any existing errors

    try {
      const data = await getForecastByCity(city);
      //console.log("Fetched weather data:", data); // Log the full data to check its structure
      setWeatherData(data);
    } catch (err: unknown) { 
      if (err instanceof AxiosError) {
        setError(err.response?.data?.error || 'Unable to fetch weather data. Please try again.');
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  // Load default weather for Sydney on initial load
  useEffect(() => {
    fetchWeather('Sydney');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar onSearch={fetchWeather} />
      <div className="container mx-auto p-4">
        
        {error && <p className="text-red-500 text-center">{error}</p>}
        {weatherData && <WeatherList weatherData={weatherData} />}
      </div>
    </div>
  );
}


 const getForecastByCity = async (city: string) => {
  const res = await fetch(`/api/weather?city=${city}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await res.json();
  return data; 
};