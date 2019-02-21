import {connect} from 'react-redux';
import CartItemsList from '../../components/cart/CartItemsList'
import {addToCart} from "../../actions/cart";
import {bindActionCreators} from "redux";

const mapStateToProps = ({cart}) => {
    return cart;
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            addToCart
        },
        dispatch
    );

export default connect(mapStateToProps,
    mapDispatchToProps)(CartItemsList)
