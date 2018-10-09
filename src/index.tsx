import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import DbEditMode from 'src/dbEditMode';

ReactDOM.render(
  <App />,
  // <DbEditMode />, // for modifying db manually
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
