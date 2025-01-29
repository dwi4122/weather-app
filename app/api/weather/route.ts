import { WeatherResponse } from '@/app/types';
import axios from 'axios';

// OpenWeatherMap API key and base URL
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Interface for forecast entry
interface Forecast {
  datetime: Date;
  temp: number;
  temp_min: number;
  temp_max: number;
  feels_like: number;
  condition: string;
  wind_speed: number;
  wind_deg: number;
  humidity: number;
  rain: number;
}

export const getForecastByCity = async (city: string): Promise<WeatherResponse> => {
  console.log(API_KEY);
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // Use Celsius for temperature
      },
    });

    const weatherData: WeatherResponse = {
      city: {
        name: response.data.city.name,
      },
      list: response.data.list.map((entry: any) => ({
        dt_txt: entry.dt_txt,
        main: {
          temp: entry.main.temp,
          temp_min: entry.main.temp_min,
          temp_max: entry.main.temp_max,
          feels_like: entry.main.feels_like,
          humidity: entry.main.humidity,
        },
        weather: entry.weather.map((w: any) => ({
          description: w.description,
        })),
        wind: {
          speed: entry.wind.speed,
          deg: entry.wind.deg,
        },
        rain: entry.rain ? entry.rain['24h'] : 0, // Rain data for last 3 hours
      })),
    };

    return weatherData;
  } catch (error: any) {
    throw new Error(`Error fetching data: ${error.response?.status} - ${error.response?.statusText}`);
  }
};

// Function to extract the forecast for today, tomorrow, and the next day
const extractForecast = (data: any): Record<number, Forecast> => {
  const forecasts: Record<number, Forecast> = {};
  const currentTime = new Date();

  // Helper function to set to midnight for day comparison
  const getMidnightDate = (date: Date): Date => {
    date.setHours(0, 0, 0, 0);
    return date;
  };

  // Get today's date at midnight
  const todayMidnight = getMidnightDate(new Date());
  
  data.list.forEach((entry: any) => {
    const forecastTime = new Date(entry.dt * 1000);
    const forecastDateMidnight = getMidnightDate(forecastTime);
    
    // Check if the forecast time is for today, tomorrow, or the day after
    const timeDiff = (forecastDateMidnight.getTime() - todayMidnight.getTime()) / (1000 * 60 * 60 * 24); // Difference in days

    if (timeDiff >= 0 && timeDiff <= 2) {
      forecasts[timeDiff] = {
        datetime: forecastTime,
        temp: entry.main.temp,
        temp_min: entry.main.temp_min,
        temp_max: entry.main.temp_max,
        feels_like: entry.main.feels_like,
        condition: entry.weather[0].description,
        wind_speed: entry.wind.speed,
        wind_deg: entry.wind.deg,
        humidity: entry.main.humidity,
        rain: entry.rain?.['3h'] || 0,
      };
    }
  });

  return forecasts;
};


