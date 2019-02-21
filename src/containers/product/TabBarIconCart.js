import {connect} from 'react-redux';
import TabBarCartIcon from '../../components/prodcut/TabBarCartIcon'
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
    mapDispatchToProps)(TabBarCartIcon)
