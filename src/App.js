//import logo from './logo.svg';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';

import DialogsContainer from './components/Dialogs/DialogsContainer';

import HeaderComponent from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';

import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import { getAuthUserData } from './redux/auth-reducer';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';


class App extends Component {
    componentDidMount() {
        this.props.initializeApp ();  
    }

    render () {
            if (!this.props.initialized) {
                return < Preloader />
        }
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

                        <Route path='/login' 
                                render={ () => <LoginPage /> } />


                        <Route path='/news' render={ () => <News /> } />
                        <Route path='/music' render={ () => <Music /> } />

                        </div>

                </div>
        
        );
        }
}

const mapStateToProps = (state) => ({
        initialized: state.app.initialized
})

export default compose( 
        withRouter,
        connect (mapStateToProps, { initializeApp })) (App);
