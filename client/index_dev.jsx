import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import DevTools from './dev_tools';
import App from './components/app';

import reducer from './reducers/reducer';

//persistence
let ACCOUNT_NAME = 'account.decadejam';

let account  = localStorage.getItem(ACCOUNT_NAME);
account = account ? JSON.parse(account) : {};

let store = createStore(
	reducer,
	{ account }, //initial state
	compose(
		applyMiddleware(thunk),
		DevTools.instrument()
	)
);

//persistence
store.subscribe(() => {
	localStorage.setItem(ACCOUNT_NAME, JSON.stringify(store.getState().account));
});

//start the process
ReactDOM.render(
	<Provider store={store}>
		<div>
			<App />
			<DevTools />
		</div>
	</Provider>,
	document.querySelector('#root')
);
