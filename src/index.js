import React from 'react';
import ReactDOM from 'react-dom';
import List from './App';
import registerServiceWorker from './Api/registerServiceWorker';

ReactDOM.render(<List />, document.getElementById('root'));
registerServiceWorker();
