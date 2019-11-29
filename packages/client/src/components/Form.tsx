import React, { useState } from 'react';
import Downshift from 'downshift';
import countries from 'countries-list/dist/countries.min.json';

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

export const Form = (): JSX.Element => {
  const [checked, setChecked] = useState<string>('zip-code');

  function handleLocationTypeChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setChecked(e.target.id);
  }

  return (
    <form className="mx-auto mt-40 p-12 w-1/2 bg-indigo-300 text-gray-800 rounded">
      <div className="mb-1 flex items-center">
        {checked !== 'zip-code' && (
          <>
            <input id="zip-code" name="location-type" type="radio" onChange={handleLocationTypeChange}></input>
            <label htmlFor="zip-code" className="ml-2">
              zip code
            </label>
          </>
        )}
        {checked !== 'city' && (
          <>
            <input id="city" name="location-type" type="radio" onChange={handleLocationTypeChange}></input>
            <label htmlFor="city" className="ml-2">
              city
            </label>
          </>
        )}
      </div>
      <label className="absolute ml-2 z-0 text-gray-500 pointer-events-none"></label>
      <div className="flex">
        <input id="zip" type="text" className={`${checked === 'city' ? 'rounded-l' : 'rounded'} pl-2 z-10`}></input>
        {checked === 'city' && (
          <Downshift
            onChange={(selection: Country): void => {
              // {{TODO}}
              selection;
            }}
            itemToString={(item: Country): string => (item ? `${item.key}` : '')}
          >
            {({ inputValue, isOpen, getItemProps, highlightedIndex, getMenuProps, getInputProps }): JSX.Element => (
              <div className="relative">
                <input {...getInputProps()} className="pl-2 w-10 rounded-r relative bg-gray-200 shadow-inner" />
                <ul {...getMenuProps()} className="rounded absolute top-0 mt-6 h-64 overflow-y-auto bg-white">
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
                                className: `w-40 ${highlightedIndex === index ? 'text-indigo-400' : 'text-gray-500'}`,
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
      </div>
    </form>
  );
};
