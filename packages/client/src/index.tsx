import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './api';

import 'normalize.css';
import './style.css';

import { Header } from './components/Header';
import { Main } from './components/Main';

const App: React.FC = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <div id="app" className="bg-purple-700 text-white h-screen">
        <Header />
        <Main />
      </div>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
