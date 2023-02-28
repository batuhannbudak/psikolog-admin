import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


import {
  Appointments, Clients,  Dashboard, PsikologsList, Login
} from './containers';

import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';

import AuthenticationService from './services/layers/AuthenticationService';
import LoadingDots from './components/shared/LoadingDots';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await AuthenticationService.checkAuthentication();

      if (res.status === 200) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();    
  }, []);
  

  if (isLoading) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <LoadingDots size="large" />
      </div>
    );
  }
  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />
  }

  return (
    <div className='flex flex-col h-full items-center'>
      <Header />
      <Router basename='/demos/psikolog-admin/build/'>
        <div className='max-w-lg flex flex-col grow-1 w-full'>
          <Navigation />
          <Switch>
            <Route path="/appointments">
              <Appointments />
            </Route>
            <Route path="/clients">
              <Clients />
            </Route>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/psikologs">
              <PsikologsList />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
