import './App.css';
import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = async () => {
    onSearch(city);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=13659205522d4d8fa1a101346241501&q=${city}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      console.log("Weather data:", data);
      // Further processing of the API response if needed
    } catch (err) {
      console.error("Error fetching data", err);
      alert(err.message);
    }
  };

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        onChange={changeHandler}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

const WeatherCard = ({ title, data }) => {
  return (
    <div className="weather-card">
      <h3>{title}</h3>
      <p>{data}</p>
    </div>
  );
};

const WeatherDisplay = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=13659205522d4d8fa1a101346241501&q=${city}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      console.error("Error fetching data", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      setLoading(true);
      getWeatherData();
    }
  }, [city]);

  return (
    <div className="weather-display">
      {loading && <p>Loading data...</p>}
      {!loading && weatherData && (
        <div className="weather-cards">
          <WeatherCard
            title="Temperature"
            data={`${weatherData.current.temp_c}°C`}
          />
          <WeatherCard
            title="Humidity"
            data={`${weatherData.current.humidity}%`}
          />
          <WeatherCard
            title="Condition"
            data={`${weatherData.current.condition.text}`}
          />
          <WeatherCard
            title="Wind Speed"
            data={`${weatherData.current.wind_kph} kph`}
          />
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [city, setCity] = useState("");

  const handleSearch = (searchedVal) => {
    setCity(searchedVal);
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay city={city} />
    </div>
  );
}



