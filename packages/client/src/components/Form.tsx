import React, { useEffect } from 'react';
import Downshift from 'downshift';
import countries from 'countries-list/dist/countries.min.json';
import { Formik, FormikValues } from 'formik';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Icon } from '@iconify/react';
import gpsFixed from '@iconify/icons-mdi/gps-fixed';

interface Country {
  name: string;
  native: string;
  phone: string;
  continent: string;
  capital: string;
  currency: string;
  languages: string[];
  key?: string;
}
interface Countries {
  [key: string]: Country;
}
const keys = Object.keys(countries);

interface FormValues extends FormikValues {
  input: string;
  'location-type': string;
  country: Country | null;
  position: Position | null;
}

interface Props {
  methods: {
    handleGetCurrentWeather: (values: any) => void;
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
      validate={(): void => {}}
      onSubmit={(values): void => {
        props.methods.handleGetCurrentWeather(values);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }): JSX.Element => {
        const [getReverseGeolocation, { loading, data, refetch }] = useLazyQuery<any>(GET_REVERSE_GEOLOCATION);

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
        }, [data]);

        function handleGPSClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
          e.preventDefault();
          if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(position => {
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
          <form className="mx-auto mt-40 p-8 w-3/4 bg-gray-200 text-gray-800 rounded shadow-lg" onSubmit={handleSubmit}>
            <div className="mb-1 flex items-center">
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
            <label className="absolute ml-2 text-gray-500 pointer-events-none"></label>
            <div className="flex flex-col md:flex-row justify-between ">
              <div className="flex">
                <input
                  id="zip"
                  type="text"
                  name="input"
                  className="rounded-l pl-2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.input}
                ></input>
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
                              className: 'pl-2 w-12 bg-gray-200 shadow-inner',
                              type: 'text',
                              placeholder: 'US',
                            })}
                          />
                          <div className=" pointer-events-none flex items-center absolute inset-y-0 right-0">
                            <span className="iconify" data-icon="ic:outline-keyboard-arrow-down"></span>
                          </div>
                        </div>
                        <ul
                          {...getMenuProps({
                            className: 'rounded absolute top-0 mt-6 h-64 overflow-y-auto bg-white',
                          })}
                        >
                          {isOpen
                            ? keys
                                .filter(
                                  key =>
                                    !inputValue ||
                                    (countries as Countries)[key].name.toLowerCase().includes(inputValue.toLowerCase()),
                                )
                                .map((key, index) => {
                                  const country = (countries as Countries)[key];
                                  return (
                                    <li
                                      key={key}
                                      {...getItemProps({
                                        index,
                                        item: { ...country, key },
                                        className: `w-40 ${
                                          highlightedIndex === index ? 'text-indigo-400' : 'text-gray-500'
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
                <button className="rounded-r bg-gray-400 px-2 shadow shadow-inner z-10" onClick={handleGPSClick}>
                  {loading ? <span>loading</span> : <Icon icon={gpsFixed}></Icon>}
                </button>
              </div>

              <div>
                <button
                  type="submit"
                  className="py-1 px-2 text-white rounded bg-blue-600 hover:bg-blue-400 mt-4 sm:mt-0"
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
