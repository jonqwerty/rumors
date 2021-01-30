
import React, { Component, ComponentType } from 'react'
import { connect, Provider } from 'react-redux'
import { BrowserRouter, HashRouter, Link, NavLink, Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import './App.css'
import 'antd/dist/antd.css'

import Music from './components/Music/Music'
import Navbar from './components/Navbar/Navbar'
import News from './components/News/News'

import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import { withSuspense } from './hoc/withSuspense'
import store, { AppStateType } from './redux/redux-store'
import { UsersPage } from './components/Users/UsersContainer'
import { LoginPage } from './components/Login/Login'
import { Avatar, Button, Col, Row } from 'antd'
import s from './components/Navbar/Navbar.module.css'

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Header } from './components/Header/Header'

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;


//import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))


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
                this.props.initializeApp();
                window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
        }
        componentWillUnmount() {
                window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
        }

        render() {
                if (!this.props.initialized) {
                        return < Preloader /> 
                }



                return (
                        <Layout>
                                <Header />
                                <Layout>
                                        <Sider width={200} className="site-layout-background">
                                                <Menu
                                                        mode="inline"
                                                        //defaultSelectedKeys={['1']}
                                                        //defaultOpenKeys={['sub1']}
                                                        style={{ height: '100%', borderRight: 0 }}
                                                >

                                                        <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
                                                                <Menu.Item key="1"><Link to='/profile' >Profile</Link></Menu.Item>
                                                                <Menu.Item key="2"><Link to='/dialogs' >Messages</Link></Menu.Item>
                                                                <Menu.Item key="3">option3</Menu.Item>
                                                                <Menu.Item key="4">option4</Menu.Item>
                                                        </SubMenu>
                                                        <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                                                                <Menu.Item key="5"><Link to='/developers' >Developers</Link></Menu.Item>
                                                                <Menu.Item key="6">option6</Menu.Item>
                                                                <Menu.Item key="7">option7</Menu.Item>
                                                                <Menu.Item key="8">option8</Menu.Item>
                                                        </SubMenu>
                                                        <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                                                <Menu.Item key="9">option9</Menu.Item>
                                                                <Menu.Item key="10">option10</Menu.Item>
                                                                <Menu.Item key="11">option11</Menu.Item>
                                                                <Menu.Item key="12">option12</Menu.Item>
                                                        </SubMenu>
                                                </Menu>
                                        </Sider>
                                        <Layout style={{ padding: '0 24px 24px' }}>
                                                <Breadcrumb style={{ margin: '16px 0' }}>
                                                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                                                        <Breadcrumb.Item>List</Breadcrumb.Item>
                                                        <Breadcrumb.Item>App</Breadcrumb.Item>
                                                </Breadcrumb>
                                                <Content
                                                        className="site-layout-background"
                                                        style={{
                                                                padding: 24,
                                                                margin: 0,
                                                                minHeight: 280,
                                                        }}
                                                >
                                                        <Switch>

                                                                <Route exact path='/'
                                                                        render={() => <Redirect to={'/profile'} />} />

                                                                <Route path='/dialogs'
                                                                        render={() => <SuspendedDialogs />} />

                                                                <Route path='/profile/:userId?'
                                                                        render={() => <SuspendedProfile />} />

                                                                <Route path='/developers'
                                                                        render={() => <UsersPage pageTitle={'Gossipers'} />} />

                                                                <Route path='/login'
                                                                        render={() => <LoginPage />} />


                                                                <Route path='/news' render={() => <News />} />
                                                                <Route path='/music' render={() => <Music />} />

                                                                <Route path='*' render={() => <div>404 NOT FOUND </div>} />

                                                        </Switch>
                                                </Content>
                                        </Layout>
                                </Layout>
                              
                        </Layout>

                )
        }
}

const mapStateToProps = (state: AppStateType) => ({
        initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
        withRouter,
        connect(mapStateToProps, { initializeApp }))(App) 


const RumorsApp: React.FC = () => {
        return <HashRouter>
                <React.StrictMode>
                        <Provider store={store}>
                                <AppContainer />
                        </Provider>
                </React.StrictMode>
        </HashRouter>
}

export default RumorsApp