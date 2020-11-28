import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile } from './../../redux/profile-reducer';

import { Redirect, withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';



class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 8;
        }
        this.props.getUserProfile(userId);
        
    }
    render() {
        
        return (
            <Profile { ...this.props } profile={this.props.profile} />
        );
    }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
});

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent);