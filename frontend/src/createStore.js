import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory, routerReducer } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import combineReducers from './reducers'

export default (initialState = {}) => {

	const middleware = [thunk]

	let composeEnhancers = compose

	if (__DEV__) {
		const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		if (typeof composeWithDevToolsExtension === 'function') {
			composeEnhancers = composeWithDevToolsExtension
		}
	}

	const store = createStore(
		combineReducers(),
		initialState,
		composeEnhancers(
			applyMiddleware(...middleware)
		)
	);

	const history = syncHistoryWithStore(browserHistory, store)

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			const reducers = require('./reducers').default
			store.replaceReducer(reducers(store.asyncReducers))
		})
	}

	return {store, history};
}
