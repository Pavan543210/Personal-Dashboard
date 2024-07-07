import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const WeatherWidget = ({ defaultLocation }) => {
  const [location, setLocation] = useState(defaultLocation);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherByGeoLocation = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`
        );
        setWeather({
          location: `${response.data.name}, ${response.data.sys.country}`,
          temperature: response.data.main.temp,
          description: response.data.weather[0].description,
          humidity: response.data.main.humidity,
          windSpeed: response.data.wind.speed,
          sunrise: new Date(response.data.sys.sunrise * 1000).toLocaleTimeString(),
          sunset: new Date(response.data.sys.sunset * 1000).toLocaleTimeString(),
          icon: response.data.weather[0].icon,
        });
        setError(null);
      } catch (error) {
        setError('Failed to fetch weather data.');
        setWeather(null);
      }
    };

    if (defaultLocation) {
      fetchWeatherByCity(defaultLocation);
    } else {
      const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              fetchWeatherByGeoLocation(latitude, longitude);
            },
            (error) => {
              setError('Failed to retrieve location. Please check your settings and try again.');
            }
          );
        } else {
          setError('Geolocation is not supported by this browser.');
        }
      };

      getLocation();
    }
  }, [defaultLocation]);

  const fetchWeatherByCity = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0809bcae6f187469e024771604d4c6a3&units=metric`
      );
      setWeather({
        location: `${response.data.name}, ${response.data.sys.country}`,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        sunrise: new Date(response.data.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(response.data.sys.sunset * 1000).toLocaleTimeString(),
        icon: response.data.weather[0].icon,
      });
      setError(null);
    } catch (error) {
      setError('Failed to fetch weather data. Please check the city name and try again.');
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim() !== '') {
      fetchWeatherByCity(location);
    }
  };

  return (
    <div className="weather-widget card shadow-sm p-3 mb-5 bg-white rounded">
      <div className="weather-search mb-4">
        <form onSubmit={handleSubmit} className="d-flex">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name..."
            className="form-control me-2"
          />
          <button type="submit" className="btn btn-secondary">
            Search
          </button>
        </form>
      </div>
      {error && <p className="text-danger mt-3">{error}</p>}
      {weather && (
        <div className="weather-card card mt-3">
          <div className="card-body">
            <h2 className="card-title">Current Weather in {weather.location}</h2>
            <div className="row align-items-center">
              <div className="col-xl-6 text-center">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                  alt="Weather Icon"
                  className="weather-icon"
                />
                <p className="weather-description"><b>Condition : </b>{weather.description}</p>
              </div>
              <div className="col-xl-6 ">
                
                <p>Temperature: {weather.temperature} °C</p>
                <p>Humidity: {weather.humidity}%</p>
                <p>Wind Speed: {weather.windSpeed} m/s</p>
                <p>Sunrise: {weather.sunrise}</p>
                <p>Sunset: {weather.sunset}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
