import React from 'react';

import './Header.css';

export const Header: React.FC = (): JSX.Element => (
  <header className="bg-purple-900 shadow-lg">
    <div className="container justify-between items-center flex h-20 mx-auto">
      <h1 className="mx-8 text-xl md:text-3xl uppercase">Sky Scanner</h1>
      <div className="mx-8 bg-indigo-400 rounded">
        <label htmlFor="toggle-button__unit" className="block relative h-6 w-20">
          <input id="toggle-button__unit" type="checkbox" className="hidden"></input>
          <span className="slider bg-indigo-700 absolute inset-x-0 inset-y-0 cursor-pointer border-2 border-indigo-800 rounded"></span>
        </label>
      </div>
    </div>
  </header>
);
