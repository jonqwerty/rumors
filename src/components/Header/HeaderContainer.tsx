import React from 'react'
import { connect } from 'react-redux'
import Header, { DispatchPropsType, MapPropsType } from './Header'
import { logout} from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store'


class HeaderComponent extends React.Component<MapPropsType & DispatchPropsType>{
    
    render() {
        return <Header {...this.props} />
        }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType> (mapStateToProps, { logout }) (HeaderComponent)