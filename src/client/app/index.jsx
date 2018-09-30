import React from 'react';
import ReactGA from 'react-ga';
import thunk from 'redux-thunk'

import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import Wrapper from './components/Wrapper.jsx';
import reducer from './reducers/index.js'

// Import routing components
import { BrowserRouter } from 'react-router-dom'

const middleware = [ thunk ]

const store = createStore(reducer, applyMiddleware(...middleware))

if(process.env.REACT_APP_ENV === "production") {
	ReactGA.initialize('UA-121843618-1');
	window.Intercom("boot", {
  	app_id: "z3v9h1dm"
	});
	console.log('Google Analytics & Intercom initialized');
}
else {
	console.log('Google Analytics is not initialized');
}

const App = () => (
  <div>
		<Wrapper />
  </div>
)

render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
  , document.getElementById('root'));
