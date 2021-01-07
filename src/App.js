//import logo from './logo.svg';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';



import HeaderComponent from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';

import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';

//import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy( () => import ('./components/Dialogs/DialogsContainer'));


class App extends Component {
    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        alert('Some error occured')
        //console.error(promiseRejectionEvent)
    }    
    componentDidMount() {
        this.props.initializeApp ();  
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
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
                                <Switch>

                                <Route exact path='/' 
                                        render={ () => <Redirect to={'/profile'} /> } />
                                {/* <Route path='/dialogs' 
                                        render={ () => {
                                                return <React.Suspense fallback={<div>Loading...</div>}> 
                                        <DialogsContainer  />
                                        </React.Suspense>
                                        } }/> */}

                                <Route path='/dialogs' 
                                        render={withSuspense(DialogsContainer)}/>

                                <Route path='/profile/:userId?' 
                                        render={ () => <ProfileContainer /> } />
                                
                                <Route path='/users' 
                                        render={ () => <UsersContainer /> } />

                                <Route path='/login' 
                                        render={ () => <LoginPage /> } />


                                <Route path='/news' render={ () => <News /> } />
                                <Route path='/music' render={ () => <Music /> } />

                                <Route path='*' render={ () => <div>404 NOT FOUND</div>} />

                                </Switch>

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
