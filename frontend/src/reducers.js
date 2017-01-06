import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'


export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
	routing: routerReducer,
	...asyncReducers
  })
}

export default makeRootReducer