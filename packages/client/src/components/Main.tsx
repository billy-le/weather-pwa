import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { weatherIcons } from '../utils/weatherIcons';

// components
import { Form } from './Form';

const CURRENT_WEATHER_QUERY = gql`
  query CurrentWeatherQuery($latitude: Float!, $longitude: Float!) {
    currentWeather(lat: $latitude, lon: $longitude)
  }
`;

interface CurrentWeather {
  currentWeather: {
    coord: { lon: number; lat: number };
    weather: Array<{ id: number; main: string; description: string; icon: string }>;
    base: string;
    main: { temp: number; pressure: number; humidity: number; temp_min: number; temp_max: number };
    visibility: number;
    wind: { speed: number };
    clouds: { all: number };
    dt: number;
    sys: { type: number; id: number; country: string; sunrise: number; sunset: number };
    timezone: number;
    id: number;
    name: string;
    cod: number;
  };
}

export const Main = (): JSX.Element | null => {
  const [getCurrentWeather, { loading, data }] = useLazyQuery<CurrentWeather>(CURRENT_WEATHER_QUERY);

  useEffect(() => {
    return;
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        getCurrentWeather({ variables: { latitude: position.coords.latitude, longitude: position.coords.longitude } });
      });
    }
  }, []);

  return loading ? null : data ? (
    <div className="container mx-auto text-center pt-40 text-3xl">
      <div>{data.currentWeather.main.temp}</div>
      <span
        className="iconify mx-auto"
        data-icon={`wi:${weatherIcons[`${data.currentWeather.weather[0].id}`].iconify}`}
      ></span>
    </div>
  ) : (
    <Form />
  );
};