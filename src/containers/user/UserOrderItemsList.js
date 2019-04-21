import {connect} from 'react-redux';
import UserOrderItemsList from '../../components/user/UserOrderItemsList'
import {getUserOrderItems} from "../../actions/user";
import {bindActionCreators} from "redux";

const mapStateToProps = ({orderItems}, data) => {
    return {orderItems, navigation: data.navigation, user: data.user, item: data.item};
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getUserOrderItems
        },
        dispatch
    );

export default connect(mapStateToProps,
    mapDispatchToProps)(UserOrderItemsList)
