import React, {useState} from 'react';
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Player from './components/Player'
import User from './components/User'
import List from './components/List'
import Search from './components/Search'
// import {DataProvider} from './context/context'
import { Route, Switch } from 'react-router-dom';

function App() {

  return (
    <div className="container">
        <Header />
          <Switch>
            <Route path="/" component={Player} exact/>
            <Route path="/User" component={User} exact />
            <Route path="/List" component={List} exact />
            <Route path="/Search" component={Search} exact />
          </Switch>
        <Footer/>
    </div>
  );
}

export default App;
