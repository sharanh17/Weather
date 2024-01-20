
import './App.css';
import React, { useState, useEffect } from 'react';

import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const handleSearch = () => {
    onSearch(city);
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
      const response = await axios.get(
        "https://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: "13659205522d4d8fa1a101346241501",
            q: city,
          },
        }
      );
      setWeatherData(response.data);
    } catch (err) {
      console.error("Error fetching data", err);
      alert("Failed to fetch weather data");
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






