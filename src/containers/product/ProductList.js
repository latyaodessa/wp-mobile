import {connect} from 'react-redux';
import ProductList from '../../components/prodcut/ProductList'
import {getProdcuts} from "../../actions/product";
import {bindActionCreators} from "redux";

const mapStateToProps = ({products, api}, navigation) => {
    return {products, api, navigation}
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getProdcuts
        },
        dispatch
    );

export default connect(mapStateToProps,
    mapDispatchToProps)(ProductList)
