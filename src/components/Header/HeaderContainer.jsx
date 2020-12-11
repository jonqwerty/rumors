import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { getAuthUserData, logout} from '../../redux/auth-reducer';

import { authAPI } from '../../api/api';

class HeaderComponent extends React.Component{
    

    render() {
        return <Header {...this.props} />
        }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});
export default connect (mapStateToProps, {getAuthUserData, logout }) (HeaderComponent);