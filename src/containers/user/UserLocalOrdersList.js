import {connect} from 'react-redux';
import UserLocalOrdersList from '../../components/user/UserLocalOrdersList'
import {bindActionCreators} from "redux";

const mapStateToProps = ({submit}, data) => {
    return {submit, navigation: data.navigation};
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
        },
        dispatch
    );

export default connect(mapStateToProps,
    mapDispatchToProps)(UserLocalOrdersList)
