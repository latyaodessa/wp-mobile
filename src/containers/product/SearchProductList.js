import {connect} from 'react-redux';
import SearchProductList from '../../components/prodcut/SearchProductList'
import {getProdcuts, getCategories} from "../../actions/product";
import {bindActionCreators} from "redux";

const mapStateToProps = ({products, categories}, navigation) => {
    return {products, categories, navigation}
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getProdcuts,
            getCategories
        },
        dispatch
    );

export default connect(mapStateToProps,
    mapDispatchToProps)(SearchProductList)
