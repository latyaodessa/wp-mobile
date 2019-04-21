import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {register} from "../../actions/user";
import UserRegistrationView from '../../components/user/UserRegistrationView';
import {getLinks} from "../../actions/core";

const mapStateToProps = ({loginData, links, changeActivePage}, dispatch) => {
    return {loginData, links,
        navigation: dispatch.navigation,
        changeActivePage: dispatch.changeActivePage};
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            register,
            getLinks
        },
        dispatch
    );

export default connect(mapStateToProps,
    mapDispatchToProps)(UserRegistrationView)
