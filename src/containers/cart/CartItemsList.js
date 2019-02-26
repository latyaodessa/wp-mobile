import {connect} from 'react-redux';
import CartItemsList from '../../components/cart/CartItemsList'
import {addToCart, deleteItem, plusOne, minusOne} from "../../actions/cart";
import {bindActionCreators} from "redux";

const mapStateToProps = ({cart}, navigation) => {
    return {cart, navigation};
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            addToCart,
            deleteItem,
            plusOne,
            minusOne
        },
        dispatch
    );

export default connect(mapStateToProps,
    mapDispatchToProps)(CartItemsList)
