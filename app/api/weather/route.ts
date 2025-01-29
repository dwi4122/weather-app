import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios'; 
import { WeatherResponse } from '@/app/types'; 

// OpenWeatherMap API key and base URL
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// GET request handler for fetching weather by city
export async function GET(request: Request) {
  const url = new URL(request.url);
  const city = url.searchParams.get('city'); // Extract city from the query string

  if (!city) {
    return NextResponse.json({ error: 'City is required' }, { status: 400 });
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // Use Celsius for temperature
      },
    });

    // Format the data to match the WeatherResponse type
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
        rain?: { '3h': number }; // Rain data might not exist for every forecast
      }) => ({
        dt_txt: entry.dt_txt,
        main: {
          temp: entry.main.temp,
          temp_min: entry.main.temp_min,
          temp_max: entry.main.temp_max,
          feels_like: entry.main.feels_like,
          humidity: entry.main.humidity,
        },
        weather: entry.weather.map((w) => ({
          description: w.description,
        })),
        wind: {
          speed: entry.wind.speed,
          deg: entry.wind.deg,
        },
        rain: entry.rain ? entry.rain['3h'] : 0, // Default to 0 if no rain data
      })),
    };

    return NextResponse.json(weatherData);
  } catch (error: unknown) {
    // Type check the error as AxiosError to handle specific error structure
    if (error instanceof AxiosError) {
      
      return NextResponse.json(
        { error: `Error fetching data: ${error.response?.status} - ${error.response?.statusText}` },
        { status: 500 }
      );
    } else {
      // Handle any non-Axios errors
      return NextResponse.json({ error: 'An unknown error occurred while fetching weather data.' }, { status: 500 });
    }
  }
}
