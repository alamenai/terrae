"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Map, MapMarker, MarkerContent } from "@/registry/map";
import { Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react";

interface WeatherData {
  city: string;
  lng: number;
  lat: number;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

const majorCities = [
  { city: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { city: "New York", lat: 40.7128, lng: -74.006 },
  { city: "London", lat: 51.5074, lng: -0.1276 },
  { city: "Tokyo", lat: 35.6895, lng: 139.6917 },
  { city: "Sydney", lat: -33.8688, lng: 151.2093 },
  { city: "Paris", lat: 48.8566, lng: 2.3522 },
  { city: "Dubai", lat: 25.2048, lng: 55.2708 },
  { city: "Singapore", lat: 1.3521, lng: 103.8198 },
];

async function fetchWeather(lat: number, lng: number): Promise<WeatherData | null> {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature&temperature_unit=celsius&wind_speed_unit=kmh`
    );
    const data = await response.json();

    if (!data.current) return null;

    const current = data.current;
    const weatherCode = current.weather_code;
    let description = "Clear";
    if (weatherCode === 0) description = "Clear";
    else if (weatherCode === 1 || weatherCode === 2) description = "Cloudy";
    else if (weatherCode === 3) description = "Overcast";
    else if (weatherCode >= 45 && weatherCode <= 48) description = "Foggy";
    else if (weatherCode >= 51 && weatherCode <= 67) description = "Drizzle";
    else if (weatherCode >= 80 && weatherCode <= 82) description = "Showers";
    else if (weatherCode >= 85 && weatherCode <= 86) description = "Snow Showers";
    else if (weatherCode >= 71 && weatherCode <= 77) description = "Snow";
    else if (weatherCode >= 80 && weatherCode <= 82) description = "Showers";
    else if (weatherCode >= 85 && weatherCode <= 86) description = "Snow Showers";
    else if (weatherCode >= 88 && weatherCode <= 92) description = "Thunderstorm";

    const cityName = majorCities.find(
      (c) => Math.abs(c.lat - lat) < 0.1 && Math.abs(c.lng - lng) < 0.1
    )?.city;

    return {
      city: cityName || "Unknown",
      lat,
      lng,
      temp: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      description,
      icon: getWeatherIcon(weatherCode),
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}

function getWeatherIcon(code: number): string {
  if (code === 0) return "☀️";
  if (code === 1 || code === 2) return "⛅";
  if (code === 3) return "☁️";
  if (code >= 45 && code <= 48) return "🌫️";
  if (code >= 51 && code <= 67) return "🌦️";
  if (code >= 80 && code <= 82) return "🌧️";
  if (code >= 85 && code <= 86) return "❄️";
  if (code >= 71 && code <= 77) return "🌨️";
  if (code >= 88 && code <= 92) return "⛈️";
  return "🌡️";
}

function WeatherMarker({ data }: { data: WeatherData }) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-3xl">{data.icon}</div>
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg min-w-45">
        <div className="font-semibold text-sm text-foreground">{data.city}</div>
        <div className="text-2xl font-bold text-primary">{data.temp}°C</div>
        <div className="text-xs text-muted-foreground">{data.description}</div>
        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Wind className="size-3" />
            Wind: {data.windSpeed} km/h
          </div>
          <div className="flex items-center gap-1">
            <Droplets className="size-3" />
            Humidity: {data.humidity}%
          </div>
        </div>
      </div>
    </div>
  );
}

export function WeatherDemoContent() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme, resolvedTheme } = useTheme();
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const mapStyle = currentTheme === "dark"
    ? "mapbox://styles/mapbox/dark-v11"
    : "mapbox://styles/mapbox/light-v11";

  useEffect(() => {
    const loadWeather = async () => {
      setIsLoading(true);
      const results = await Promise.all(
        majorCities.map((city) => fetchWeather(city.lat, city.lng))
      );
      setWeatherData(results.filter((data) => data !== null) as WeatherData[]);
      setIsLoading(false);
    };

    loadWeather();

    // Refresh weather every 10 minutes
    const interval = setInterval(loadWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full bg-muted/50 animate-pulse" />
    );
  }

  return (
    <div className="w-full h-full">
      <div className="h-full w-full overflow-hidden">
        <Map
          accessToken={accessToken}
          center={[20, 20]}
          zoom={2}
          style={mapStyle}
        >
          {weatherData.map((data) => (
            <MapMarker
              key={data.city}
              coordinates={[data.lng, data.lat]}
            >
              <MarkerContent>
                <WeatherMarker data={data} />
              </MarkerContent>
            </MapMarker>
          ))}
        </Map>
      </div>
    </div>
  );
}
