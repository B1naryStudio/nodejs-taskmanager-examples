import Home from './Home'
import React from 'react'
import { Route } from 'react-router'

const routes = () => (
	<Route path="/" component={Home}>
		<Route path="*" component={Home}/>
	</Route>
);

export default routes;