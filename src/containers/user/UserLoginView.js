import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {login} from "../../actions/user";
import UserLoginView from '../../components/user/UserLoginView';
import {getLinks} from "../../actions/core";

const mapStateToProps = ({loginData, links}, dispatch) => {
    return {
        loginData, links,
        navigation: dispatch.navigation,
        changeActivePage: dispatch.changeActivePage,
        userLogin: dispatch.userLogin
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            login,
            getLinks
        },
        dispatch
    );

export default connect(mapStateToProps,
    mapDispatchToProps)(UserLoginView)
