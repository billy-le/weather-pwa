import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'normalize.css';
import './style.css';

const App: React.FC = (): JSX.Element => {
  return <div id="app">Hello, World</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
