import Dialogs from './Dialogs';
import { actions } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';


const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(actions.sendMessageActionCreator(newMessageBody));
        }
    };
}

export default compose( //export default DialogsContainer;
    connect(mapStateToProps, mapDispatchToProps), //const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
    withAuthRedirect //let AuthRedirectComponent = withAuthRedirect(Dialogs);
)(Dialogs);
