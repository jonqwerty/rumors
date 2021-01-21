
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { actions } from '../../redux/dialogs-reducer';
import { AppStateType } from '../../redux/redux-store';
import Dialogs from './Dialogs';

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         sendMessage: (newMessageBody) => {
//             dispatch(actions.sendMessage(newMessageBody));
//         }
//     }
// }

export default compose<React.ComponentType>(
    connect(mapStateToProps, {... actions }),
    withAuthRedirect
) (Dialogs);

// let AuthRedirectComponent = withAuthRedirect(Dialogs);

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

// export default DialogsContainer;