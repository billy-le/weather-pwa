import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { weatherIcons, tempConversion } from '../utils/';
import Icon from '@iconify/react';
import iconCelsius from '@iconify/icons-mdi/temperature-celsius';
import iconFahrenheit from '@iconify/icons-mdi/temperature-fahrenheit';
import thermometer from '@iconify/icons-mdi/thermometer';

import { Context } from '../context';

// components
import { Form } from './Form';

// types
import { CurrentWeather, FormValues } from '../types';

const CURRENT_WEATHER_QUERY = gql`
  query CurrentWeatherQuery($lat: Float, $lon: Float, $q: String, $zip: String) {
    currentWeather(lat: $lat, lon: $lon, q: $q, zip: $zip)
  }
`;

export const Main = (): JSX.Element | null => {
  const [getCurrentWeather, { loading, data }] = useLazyQuery<CurrentWeather>(CURRENT_WEATHER_QUERY);

  function handleGetCurrentWeather(formValues: FormValues): void {
    const { position, country, input } = formValues;
    const locationType = formValues['location-type'];

    if (position) {
      getCurrentWeather({
        variables: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
      });
    } else if (locationType === 'city') {
      if (country) {
        const searchQuery = `${input.length ? input : country.capital ? country.capital : ''},${
          country.key ? country.key : 'us'
        }`;
        getCurrentWeather({
          variables: {
            q: searchQuery,
          },
        });
      } else {
        getCurrentWeather({
          variables: {
            q: input,
          },
        });
      }
    } else if (locationType === 'zip-code') {
      getCurrentWeather({
        variables: {
          zip: input,
        },
      });
    }
  }

  useEffect(() => {
    if (data && data.currentWeather.imageUrl) {
      const app = document.querySelector<HTMLElement>('#app');
      if (app) {
        app.style.backgroundImage = `url("${data.currentWeather.imageUrl}")`;
      }
    }
  }, [data]);

  return (
    <Context.Consumer>
      {(context): JSX.Element => (
        <div>
          <Form methods={{ handleGetCurrentWeather }} />
          {loading ? null : data && data.currentWeather ? (
            <div className="container mx-auto z-10">
              <div className="flex justify-center">
                <div className="p-8">
                  <div className="flex">
                    <div className="text-6xl leading-none">
                      {tempConversion({
                        from: 'kelvin',
                        to: context.unit,
                        value: data.currentWeather.main.temp,
                      }).toFixed(2)}
                    </div>
                    <Icon
                      className="text-3xl mt-2"
                      icon={context.unit === 'imperial' ? iconFahrenheit : iconCelsius}
                    ></Icon>
                    <Icon className="text-3xl mt-2" icon={thermometer}></Icon>
                  </div>
                  <div className="text-xl">{data.currentWeather.name}</div>
                </div>
                <div className="p-8 flex flex-col">
                  <div
                    className="iconify mx-auto text-6xl"
                    data-icon={`wi:${weatherIcons[`${data.currentWeather.weather[0].id}`].iconify}`}
                  ></div>
                  <div className="mt-1">{data.currentWeather.weather[0].description}</div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </Context.Consumer>
  );
};
