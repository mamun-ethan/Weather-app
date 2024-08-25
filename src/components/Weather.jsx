import React, { useEffect, useState } from "react";
import Weather_icon from "../assets/image/sun.png";
import moment from "moment";
import axios from "axios";

const api_keys = import.meta.env.VITE_api_keys;

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [changeValue, setChangeValue] = useState("");
  const [location, setLocation] = useState({ latitude: 40.7128, longitude: -74.0060 }); // Default to New York City
  const [time, setTime] = useState(moment().format("hh:mm:ss a"));
  const date = moment().format("MMM Do YY");

  // Start timer to update the time every second
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(moment().format("hh:mm:ss a"));
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  // Get geolocation and fetch weather data on component mount
  useEffect(() => {
    const geoLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Geolocation error:", error.message);
            alert("Geolocation failed. Using default location.");
            fetchWeatherData();
          }
        );
      } else {
        alert("Geolocation is not supported by this browser. Using default location.");
      }
    };

    geoLocation();
  }, []);

  // Fetch weather data based on location (latitude and longitude)
  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchWeatherData();
    }
  }, [location]);

  //  fetch weather data
  const fetchWeatherData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${api_keys}&units=metric`;
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Weather data fetch error:", error.message);
      alert("Failed to fetch weather data.");
    }
  };

  //  fetch weather data by city name
  const fetchBySubmit = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${changeValue}&appid=${api_keys}&units=metric`;
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Weather data fetch error by city:", error.message);
      alert("Failed to fetch weather data for the entered location.");
    }
  };

  // Handle input change
  const handleChange = (event) => {
    setChangeValue(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!changeValue.trim()) {
      alert("Enter the city name");
    } else {
      fetchBySubmit();
    }
  };

  return (
    <div className="container">
      <div className="search_bar">
        <input
          type="text"
          className="search_feild"
          placeholder="Search by City"
          onChange={handleChange}
        />
        <button className="search_btn" onClick={handleSubmit}>Search</button>
      </div>
      <div className="weather_data">
        <div className="weather_status_icon">
          <img className="icon" src={Weather_icon} alt="Weather Icon" />
          <div className="date_time">
            <span>
              <i className="fa-solid fa-calendar-days"></i> {date}
            </span>
            <span>
              <i className="fa-solid fa-clock"></i> {time}
            </span>
          </div>
        </div>
        <div className="temperature_status">
          <span className="location">
            <i className="fa-solid fa-location-dot"></i>
            {weatherData ? weatherData.name : "Unknown"} , {weatherData ? weatherData.sys.country : ""}
          </span>
          <div className="temp">
            <h1>{weatherData ? Math.floor(weatherData.main.temp) : "--"}°</h1>
            <span className="day_status">{weatherData ? weatherData.weather[0].main : ""}</span>
          </div>
        </div>
      </div>
      <div className="air_day_vibe">
        <div className="wind_status">
          <span className="wind_speeds">
            <i className="fa-solid fa-wind"></i> {weatherData ? weatherData.wind.speed : "--"} km/h
          </span>
          <br />
          <span className="wind_status_label">Wind Speed</span>
        </div>
        <div className="humidity">
          <span className="humidity_rate">
            <i className="fa-solid fa-temperature-three-quarters"></i> {weatherData ? weatherData.main.humidity : "--"}%
          </span>
          <br />
          <span className="humidity_status_label">Humidity</span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
