import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import {
  animateSearchBarClick,
  animateWeather,
} from "../animations/weatherAnimations";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";

const Weather = () => {
  const inputRef = useRef();
  const weatherIconRef = useRef();
  const forecastRef = useRef();

  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [theme, setTheme] = useState("light");

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city = "", lat = null, lon = null) => {
    if (!city.trim() && lat === null && lon === null) {
      alert("Enter City Name:");
      return;
    }

    try {
      const currentWeatherURL =
        lat && lon
          ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${
              import.meta.env.VITE_APP_ID
            }`
          : `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
              import.meta.env.VITE_APP_ID
            }`;

      const forecastURL =
        lat && lon
          ? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${
              import.meta.env.VITE_APP_ID
            }`
          : `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${
              import.meta.env.VITE_APP_ID
            }`;

      const weatherRes = await fetch(currentWeatherURL);
      const weatherJson = await weatherRes.json();

      if (!weatherRes.ok) {
        alert(weatherJson.message);
        return;
      }

      const iconCode = weatherJson.weather[0].icon;
      setTheme(iconCode.includes("n") ? "dark" : "light");

      const icon = allIcons[iconCode] || clear_icon;
      setWeatherData({
        temperature: Math.round(weatherJson.main.temp),
        description: weatherJson.weather[0].description,
        location: weatherJson.name,
        icon: icon,
      });

      const forecastRes = await fetch(forecastURL);
      const forecastJson = await forecastRes.json();

      if (!forecastRes.ok) {
        setForecastData([]);
        return;
      }

      const dailyForecast = forecastJson.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .slice(0, 5);

      setForecastData(
        dailyForecast.map((item) => ({
          date: new Date(item.dt_txt).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          temp: Math.round(item.main.temp),
          description: item.weather[0].description,
          icon: allIcons[item.weather[0].icon] || clear_icon,
        }))
      );
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeatherData(null);
      setForecastData([]);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          search("", coords.latitude, coords.longitude);
        },
        () => {
          search("Vadodara");
        }
      );
    } else {
      search("Vadodara");
    }
  }, []);

  useEffect(() => {
    if (weatherData && forecastData.length > 0) {
      requestAnimationFrame(() => {
        animateWeather(weatherIconRef, forecastRef);
      });
    }
  }, [weatherData, forecastData]);

  return (
    <div className={`weather theme-${theme}`}>
      <div className="searchbar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search City"
          onFocus={() => animateSearchBarClick(inputRef)}
        />
        <img
          src={search_icon}
          alt="search"
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {weatherData && (
        <>
          <img
            ref={weatherIconRef}
            src={weatherData.icon}
            alt="weather icon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="description">{weatherData.description}</p>
          <p className="location">{weatherData.location}</p>
        </>
      )}

      {forecastData.length > 0 && (
        <div className="forecast" ref={forecastRef}>
          <h3>5-Day Forecast</h3>
          <div className="forecast-cards">
            {forecastData.map((day, index) => (
              <div className="forecast-card" key={index}>
                <p>{day.date}</p>
                <img src={day.icon} alt="forecast icon" />
                <p>{day.temp}°C</p>
                <p>{day.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
