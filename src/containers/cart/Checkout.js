import {connect} from 'react-redux';
import Checkout from '../../components/cart/Checkout'
import {bindActionCreators} from "redux";
import {getCheckoutFields, getShippingMethods, submitOrder} from "../../actions/checkout";
import {emptyCart} from "../../actions/cart";
import {addLocalOrders} from "../../actions/user";

const mapStateToProps = ({submit, cart, shippingMethods, checkoutFields}, data) => {
    return {submit, cart, shippingMethods, checkoutFields, navigation: data.navigation};
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getCheckoutFields,
            getShippingMethods,
            submitOrder,
            emptyCart,
            addLocalOrders
        },
        dispatch
    );

export default connect(mapStateToProps,
    mapDispatchToProps)(Checkout)
