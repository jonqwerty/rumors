//import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import DialogsContainer from './components/Dialogs/DialogsContainer';

import HeaderComponent from './components/Header/HeaderContainer';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';

import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import store from './redux/redux-store';


const App = (props) => {

  return (
    
      <div className='app-wrapper'>
        <HeaderComponent />
        <Navbar />
        <div className='app-wrapper-content'>
        
          <Route path='/dialogs' 
                  render={ () => <DialogsContainer  /> } />

          <Route path='/profile/:userId?' 
                  render={ () => <ProfileContainer /> } />
          
          <Route path='/users' 
                  render={ () => <UsersContainer /> } />


          <Route path='/news' render={ () => <News /> } />
          <Route path='/music' render={ () => <Music /> } />

        </div>

      </div>
    
  );
}

export default App;
