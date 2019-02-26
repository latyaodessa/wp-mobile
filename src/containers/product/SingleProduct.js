import {connect} from 'react-redux';
import SingleProduct from '../../components/prodcut/SingleProduct'
import {getSingleProdcut} from "../../actions/product";
import {addToCart} from "../../actions/cart";
import {getImagesByIds} from "../../actions/attachments";
import {bindActionCreators} from "redux";

const mapStateToProps = ({singleProduct, images, cart}, props) => {
    return {
        singleProduct,
        images,
        item: props.item,
        cart: cart,
        navigation: props.navigation,
        showAddToCartMessage: props.showAddToCartMessage
    }
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getSingleProdcut,
            getImagesByIds,
            addToCart
        },
        dispatch
    );

export default connect(mapStateToProps,
    mapDispatchToProps)(SingleProduct)
