import React  from 'react';
import {render} from 'react-dom'
import {IndexRoute, Router, Route, hashHistory} from 'react-router'
import App from './App';
import LocationList from './LocationList';
import Detail from './Detail';

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={LocationList}/>
            <Route path="/detail" component={Detail}/>
        </Route>
    </Router>
), document.getElementById('root'));