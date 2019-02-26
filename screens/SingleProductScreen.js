import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import SingleProduct from './../src/containers/product/SingleProduct';
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
export default class SingleProductScreen extends React.Component {

    showAddToCartMessage = () => {
        showMessage({
            message: "Товар добавлен в корзину",
            type: "default",
        });
    };

    render() {
        const {navigation} = this.props;
        const item = navigation.getParam('item', null);
        return (
            <View style={styles.container}>
                <SingleProduct item={item} navigation={navigation} showAddToCartMessage={this.showAddToCartMessage}/>
                <FlashMessage position="top" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
