import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './api';

import { Context } from './context';

import 'normalize.css';
import './style.css';

import { Header } from './components/Header';
import { Main } from './components/Main';

const App: React.FC = (): JSX.Element => {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('metric');

  function setUnitType(unit: 'imperial' | 'metric'): void {
    setUnit(unit);
  }

  return (
    <ApolloProvider client={client}>
      <Context.Provider value={{ unit: unit, changeUnitType: setUnitType }}>
        <div id="app" className="bg-purple-700 text-white h-screen">
          <Header />
          <Main />
        </div>
      </Context.Provider>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
