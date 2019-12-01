import React, { useState, useEffect } from 'react';
import Downshift from 'downshift';
import countries from 'countries-list/dist/countries.min.json';
import { Formik } from 'formik';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Icon } from '@iconify/react';
import gpsFixed from '@iconify/icons-mdi/gps-fixed';
import caretDown from '@iconify/icons-mdi/arrow-down-drop';

import './Form.css';

// types
import { Countries, Country, FormValues, ReverseGeolocation } from '../types';

const keys = Object.keys(countries);

interface Props {
  methods: {
    handleGetCurrentWeather: (values: FormValues) => void;
  };
}

const GET_REVERSE_GEOLOCATION = gql`
  query ReverseGeolocationQuery($lat: Float, $lon: Float, $format: String) {
    reverseGeolocation(lat: $lat, lon: $lon, format: $format)
  }
`;

export const Form: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <Formik
      initialValues={
        {
          input: '',
          'location-type': 'zip-code',
          country: null,
          position: null,
        } as FormValues
      }
      validate={(values): object | undefined => {
        let errors: object | undefined;
        if (!values.input.length) {
          errors = { input: 'this field is required' };
          return errors;
        }
        return errors;
      }}
      onSubmit={(values, { setFieldValue }): void => {
        props.methods.handleGetCurrentWeather(values);
        setFieldValue('position', null);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, errors, touched }): JSX.Element => {
        const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
        const [getReverseGeolocation, { data, refetch }] = useLazyQuery<{
          reverseGeolocation: ReverseGeolocation;
        }>(GET_REVERSE_GEOLOCATION);

        useEffect(() => {
          if (data) {
            const { postcode, city, country } = data.reverseGeolocation.address;
            const zipCode = `${postcode}`;
            const location = `${city}, ${country}`;
            if (values['location-type'] === 'zip-code') {
              setFieldValue('input', zipCode);
            } else if (values['location-type'] === 'city') {
              setFieldValue('input', location);
            }
          }
          setIsLoadingGeolocation(false);
        }, [data]);

        function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>): void {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
          }
        }

        function handleGPSClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
          e.preventDefault();
          setIsLoadingGeolocation(true);
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
              setFieldValue('position', position);
              if (!data) {
                getReverseGeolocation({
                  variables: { lat: position.coords.latitude, lon: position.coords.longitude, format: 'json' },
                });
              } else {
                refetch({
                  variables: { lat: position.coords.latitude, lon: position.coords.longitude, format: 'json' },
                });
              }
            });
          }
        }

        return (
          <form className="mx-auto pb-8 pt-2 w-3/4 text-white" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row justify-center relative">
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <label htmlFor="zip-code" className="mr-4 flex items-center">
                    <input
                      className="mr-2"
                      id="zip-code"
                      value="zip-code"
                      name="location-type"
                      type="radio"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values['location-type'] === 'zip-code'}
                    ></input>
                    zip code
                  </label>
                  <label htmlFor="city" className="flex items-center">
                    <input
                      className="mr-2"
                      id="city"
                      value="city"
                      name="location-type"
                      type="radio"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values['location-type'] === 'city'}
                    ></input>
                    city
                  </label>
                </div>
                <div className="flex relative">
                  <div className="relative">
                    <div className="absolute w-full h-full bg-purple-900 opacity-25 z-0 inset-y-0 inset-x-0 rounded-l"></div>
                    <input
                      type="text"
                      name="input"
                      className="pl-2 bg-transparent py-1 border-b-2 border-white text-white outline-none z-10 relative"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyPress={handleKeyPress}
                      value={values.input}
                      placeholder={values['location-type'] === 'zip-code' ? 'enter a zip-code' : 'enter a city name'}
                    ></input>
                  </div>
                  {values['location-type'] === 'city' && (
                    <Downshift
                      onChange={(selection: Country): void => {
                        setFieldValue('country', selection);
                      }}
                      itemToString={(item: Country): string => (item ? `${item.key}` : '')}
                    >
                      {({
                        inputValue,
                        isOpen,
                        getItemProps,
                        highlightedIndex,
                        getMenuProps,
                        getInputProps,
                      }): JSX.Element => (
                        <div className="relative">
                          <div className="relative flex h-full">
                            <input
                              {...getInputProps({
                                className: 'pl-2 w-12 bg-purple-800 border-b-2 opacity-75',
                                type: 'text',
                                placeholder: 'US',
                              })}
                            />
                            <div className="pointer-events-none flex items-center absolute inset-y-0 right-0">
                              <Icon icon={caretDown} />
                            </div>
                          </div>
                          <ul
                            {...getMenuProps({
                              className: 'rounded absolute h-64 overflow-y-auto bg-white',
                            })}
                          >
                            {isOpen
                              ? keys
                                  .filter(
                                    key =>
                                      !inputValue ||
                                      key.toLowerCase().includes(inputValue.toLowerCase()) ||
                                      (countries as Countries)[key].name
                                        .toLowerCase()
                                        .includes(inputValue.toLowerCase()),
                                  )
                                  .map((key, index) => {
                                    const country = (countries as Countries)[key];
                                    return (
                                      <li
                                        key={key}
                                        {...getItemProps({
                                          index,
                                          item: { ...country, key },
                                          className: `w-40 px-2 text-sm ${
                                            highlightedIndex === index
                                              ? 'bg-indigo-200 text-indigo-800'
                                              : 'text-gray-500'
                                          }`,
                                        })}
                                      >
                                        {key} - {country.name}
                                      </li>
                                    );
                                  })
                              : null}
                          </ul>
                        </div>
                      )}
                    </Downshift>
                  )}
                  <button
                    className="rounded-r bg-transparent px-2 bg-purple-800 shadow shadow-inner"
                    onClick={handleGPSClick}
                  >
                    <Icon
                      icon={gpsFixed}
                      className={`gps-icon ${isLoadingGeolocation ? 'loading pointer-events-none' : ''}`}
                    ></Icon>
                  </button>
                </div>
                {errors && errors.input && touched && touched.input && (
                  <div className="text-red-400 text-xs italic ml-2 absolute bottom-0 -mb-5">{errors.input}</div>
                )}
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="py-1 px-2 text-white rounded bg-blue-600 hover:bg-blue-400 mt-4 sm:mt-0 ml-0 sm:ml-4"
                >
                  Get Weather
                </button>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
