import { WeatherResponse } from '@/app/types';
import axios, { AxiosError } from 'axios'; // Import AxiosError for better error typing

// OpenWeatherMap API key and base URL
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';




export const getForecastByCity = async (city: string): Promise<WeatherResponse> => {
  //console.log(API_KEY);
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // Use Celsius for temperature
      },
    });

    // Use more specific types instead of `any`
    const weatherData: WeatherResponse = {
      city: {
        name: response.data.city.name,
      },
      list: response.data.list.map((entry: {
        dt_txt: string;
        main: {
          temp: number;
          temp_min: number;
          temp_max: number;
          feels_like: number;
          humidity: number;
        };
        weather: { description: string }[];
        wind: { speed: number; deg: number };
        rain?: { '24h': number }; // Rain data might not exist for every forecast
      }) => ({
        dt_txt: entry.dt_txt,
        main: {
          temp: entry.main.temp,
          temp_min: entry.main.temp_min,
          temp_max: entry.main.temp_max,
          feels_like: entry.main.feels_like,
          humidity: entry.main.humidity,
        },
        weather: entry.weather.map(w => ({
          description: w.description,
        })),
        wind: {
          speed: entry.wind.speed,
          deg: entry.wind.deg,
        },
        rain: entry.rain ? entry.rain['24h'] : 0, // Default to 0 if no rain data
      })),
    };

    return weatherData;
  } catch (error: unknown) {
    // Handle the error with type-checking
    if (error instanceof AxiosError) {
      throw new Error(`Error fetching data: ${error.response?.status} - ${error.response?.statusText}`);
    } else {
      throw new Error('An unknown error occurred while fetching weather data.');
    }
  }
};



