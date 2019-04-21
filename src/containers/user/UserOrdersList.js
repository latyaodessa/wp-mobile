import {connect} from 'react-redux';
import UserOrdersList from '../../components/user/UserOrdersList'
import {getUserOrders} from "../../actions/user";
import {bindActionCreators} from "redux";

const mapStateToProps = ({userOrders, submit}, data) => {
    return {userOrders, submit, navigation: data.navigation};
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getUserOrders
        },
        dispatch
    );

export default connect(mapStateToProps,
    mapDispatchToProps)(UserOrdersList)
