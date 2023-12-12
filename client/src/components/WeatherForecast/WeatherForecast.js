import React, { useState, useEffect } from 'react';
import { Grid, Card, Segment } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudRain, faSnowflake, faSmog } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../contexts/ThemeProvider'; // Import useTheme

const WeatherForecast = ({ resort }) => {
  const [forecast, setForecast] = useState(null);
  const { theme } = useTheme(); // Corrected to destructure theme

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = '0043088228814a3dbf9182754231212';
      const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${resort}&days=7&aqi=no&alerts=no`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setForecast(data.forecast.forecastday.slice(0, 3)); // Slice to get only 3 days
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };

    fetchWeather();
  }, [resort]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const segmentStyle = {
    backgroundColor: theme === 'light' ? 'white' : '#1B1C1D',
    color: theme === 'light' ? 'black' : 'rgb(33,133,208)',
  };

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
    <Segment style={segmentStyle}>
      <Grid columns={forecast.length} divided>
        {forecast.map((day, index) => (
          <Grid.Column key={index}>
            <Card>
              <Card.Content>
                <FontAwesomeIcon icon={getWeatherIcon(day.day.condition.text)} size="2x" />
                <Card.Header>{formatDate(day.date)}</Card.Header>
                <Card.Meta>
                  High: {day.day.maxtemp_c}°C, Low: {day.day.mintemp_c}°C
                </Card.Meta>
                <Card.Description>
                  Chance of rain: {day.day.daily_chance_of_rain}%
                  <br />
                  {day.day.condition.text}
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>
    </Segment>
  );
};

export default WeatherForecast;
