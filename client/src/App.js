import React, { Fragment } from 'react';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Alert from './component/layout/Alert';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// Redux
import {Provider} from 'react-redux';
import store from './store/store';

const App = () => (
  <Provider store={store}>
  <Router>
  <Fragment>
    <Navbar/>
    <Route exact path='/' component={Landing}/>
    <section className='container'>
    <Alert/>
    <Switch>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
    </Switch>
    </section>
  </Fragment>
  </Router>
  </Provider>
);
export default App;
