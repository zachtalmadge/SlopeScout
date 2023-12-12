import React, { useState, useEffect } from 'react';
import { Card, List, Icon } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudRain, faSnowflake, faSmog } from '@fortawesome/free-solid-svg-icons';

const WeatherForecast = ({ resort }) => {

  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = '0043088228814a3dbf9182754231212'; // Your API key
      const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${resort}&days=7&aqi=no&alerts=no`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setForecast(data.forecast.forecastday);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };

    fetchWeather();
  }, [resort]);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Sunny':
        return faSun;
      case 'Rain':
        return faCloudRain;
      case 'Snow':
        return faSnowflake;
      case 'Fog':
        return faSmog;
      default:
        return faSun; // Default icon
    }
  };

  if (!forecast) {
    return <p>Loading weather data...</p>;
  }

  return (
    <Card>
      <Card.Content>
        <Card.Header>7-Day Weather Forecast for {resort}</Card.Header>
        <List>
          {forecast.map((day, index) => (
            <List.Item key={index}>
              <FontAwesomeIcon icon={getWeatherIcon(day.day.condition.text)} />
              <List.Content>
                <List.Header>{day.date}</List.Header>
                <List.Description>
                  High: {day.day.maxtemp_c}°C, Low: {day.day.mintemp_c}°C
                  <br />
                  Chance of rain: {day.day.daily_chance_of_rain}%
                  <br />
                  Conditions: {day.day.condition.text}
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Card.Content>
    </Card>
  );
};

export default WeatherForecast;
