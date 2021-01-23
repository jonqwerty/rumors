
import React, { Component, ComponentType } from 'react'
import { connect, Provider } from 'react-redux'
import { BrowserRouter, HashRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import './App.css'
import HeaderComponent from './components/Header/HeaderContainer'
import LoginPage from './components/Login/Login'
import Music from './components/Music/Music'
import Navbar from './components/Navbar/Navbar'
import News from './components/News/News'

import UsersContainer from './components/Users/UsersContainer'
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import { withSuspense } from './hoc/withSuspense'
import store, { AppStateType } from './redux/redux-store'

//import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy( () => import ('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy( () => import ('./components/Profile/ProfileContainer'))


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
        initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

class App extends Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
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
                                
                                <Route path='/dialogs' 
                                        render={ () => <SuspendedDialogs /> }/>

                                <Route path='/profile/:userId?' 
                                        render={ () => <SuspendedProfile />  }/>
                                        
                                <Route path='/users' 
                                        render={ () => <UsersContainer pageTitle={'samurai'} /> } />

                                <Route path='/login' 
                                        render={ () => <LoginPage /> } />


                                <Route path='/news' render={ () => <News /> } />
                                <Route path='/music' render={ () => <Music /> } />

                                <Route path='*' render={ () => <div>404 NOT FOUND</div>} />

                                </Switch>
                        </div>
                </div>       
        )
        }
}

const mapStateToProps = (state: AppStateType) => ({
        initialized: state.app.initialized
})

let AppContainer =  compose<React.ComponentType>( 
        withRouter,
        connect (mapStateToProps, { initializeApp })) (App)


const RumorsApp: React.FC = () => {
        return  <HashRouter>
                <React.StrictMode>
                        <Provider store={store}>
                                 <AppContainer />
                        </Provider>
                </React.StrictMode>
                </HashRouter>
 }

export default RumorsApp