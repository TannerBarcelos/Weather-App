import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import '../src/styles/app.css';

const root = document.querySelector ('#root');

ReactDOM.render (<App />, root);

/**
 * Main react file: hooks into the html file 
 */
