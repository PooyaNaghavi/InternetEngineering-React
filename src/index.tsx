import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Components/Utils/reset.css';
import 'bootstrap/dist/css/bootstrap.css';
import './Components/Utils/fonts.css';
import './Components/Utils/common.css';

import * as serviceWorker from './serviceWorker';
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Profile from './Components/Profile/index';
import Project from './Components/Project/index';
import Register from './Components/Register/index';

ReactDOM.render(
    <Router>
        <Route exact path="/user" component={Profile}/>
        <Route exact path="/project" component={Project}/>
        <Route exact path="/register" component={Register}/>
    </Router>, 
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
