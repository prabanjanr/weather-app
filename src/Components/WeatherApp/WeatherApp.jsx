import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import cloud_icon from "../Assets/cloud.png";
import humidity_icon from "../Assets/humidity.png";
import wind_icon from "../Assets/wind.png";

const WeatherApp = () => {
  const api_key = "9a7ab009ab04b2d1b42a95e3a865a8dd";
  const [weatherData, setWeatherData] = useState(null);
  const [searchText, setSearchText] = useState("");

  const search = async () => {
    if (searchText === "") {
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=Metric&appid=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={cloud_icon} alt="" />
      </div>
      {weatherData && (
        <div className="weather-data">
          <div className="weather-temp">{weatherData.main.temp}°C</div>
          <div className="weather-location">{weatherData.name}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">
                  {weatherData.main.humidity}%
                </div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">
                  {weatherData.wind.speed} km/hr
                </div>
                <div className="text">Wind speed</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
