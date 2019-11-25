import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './style.css';

import { Header } from './components/Header';
import { Main } from './components/Main';

const App: React.FC = (): JSX.Element => {
  return (
    <div id="app" className="bg-purple-700 text-white h-screen">
      <Header />
      <Main />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
