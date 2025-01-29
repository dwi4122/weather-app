

export interface Weather {
  dt_txt: string; // Date and time of the forecast
  main: {
    temp: number; // Current temperature
    feels_like: number; // Feels like temperature
    humidity: number; // Humidity percentage
    temp_min: number; // Optional minimum temperature
    temp_max: number ; // Optional maximum temperature
  };
  weather: {
    description: string; // Weather description (e.g., "clear sky", "light rain")
  }[];
  wind: {
    speed: number; // Wind speed in km/h
    deg: number; // Wind direction
  };
  rain?: {
    '3h': number; // Rain in the last 3 hours (optional)
  };
}

export interface WeatherResponse {
  city: {
    name: string; // City name
  };
  list: Weather[]; // Forecast list
}

export type WeatherCardProps = {
  weather: {
    date: string;
    city: string;
    temp: number;
    temp_min: number;
    temp_max: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    weather: string;
  };
  
};





