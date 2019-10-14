import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './style.css';

import { Header } from './components/Header';

const App: React.FC = (): JSX.Element => {
  return (
    <div id="app">
      <Header />
      Hello, World
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
