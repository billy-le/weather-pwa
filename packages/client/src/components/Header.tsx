import React from 'react';

export const Header: React.FC = (): JSX.Element => (
  <header className="bg-purple-900 shadow-lg">
    <div className="container justify-between items-center flex h-20 mx-auto">
      <h1 className="p-8 text-3xl uppercase">Sky Scanner</h1>
      <div>
        <label htmlFor="celsius" className="p-8 uppercase">
          <input id="celsius" type="radio" className="hidden"></input>c
        </label>
        <label htmlFor="farenheit" className="p-8 uppercase">
          <input id="farenheit" type="radio" className="hidden"></input>f
        </label>
      </div>
    </div>
  </header>
);
