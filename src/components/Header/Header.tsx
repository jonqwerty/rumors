
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import s from './Header.module.css'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Layout, Menu, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUserLogin, selectIsAuth } from '../../redux/auth-selectors'
import { logout } from '../../redux/auth-reducer'
import logo from './../../images/logo_small.png'

export type MapPropsType = {
  // isAuth: boolean
  // login: string | null
}




export const Header: React.FC<MapPropsType> = (props) => {

  const isAuth = useSelector(selectIsAuth)
  const login = useSelector(selectCurrentUserLogin)

  const dispatch = useDispatch()

  const logoutcallback = () => {
    dispatch(logout())
  }

  const { Header } = Layout

  return (

    <Header className="header">
      <div className="logo" />
      <Row >
        <Col span={2}>
          <img src={logo} alt="logo"/>
        </Col>
        <Col span={8}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1"><Link to='/developers' style={{ color: 'yellow' }} >Gossipers</Link></Menu.Item>
          </Menu>
        </Col>
        <Col span={8}>
          <p style={{ color: 'yellow', font: 'arial', fontSize: '50px' }}>RUMORS</p>
        </Col> 

       
        {isAuth
          ? <><Col span={3} >
            <Avatar style={{ backgroundColor: 'yellow' }} icon={<UserOutlined />} />
            {login}
          </Col>

            <Col span={3} >

              <Button onClick={logoutcallback}> Log out </Button>
            </Col>
          </>
          : <Col span={6} >
            <Button>
              <Link to={'/login'}>Login</Link>
            </Button>
          </Col>}

      </Row>
    </Header>

    // <header className={s.header}>

    //     <div>
    //     <img src='https://webstockreview.net/images/clipart-ear-science-sound-1.png' />
    //     </div>
    //     <div className={s.item}>
    //         <p>RUMORS</p>
    //     </div>
    //     <div className={s.loginBlock} >
    //         
    //     </div>


    // </header>
  )
}

