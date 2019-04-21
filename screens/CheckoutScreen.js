import React from 'react';
import {StyleSheet, View} from 'react-native';
// import {showMessage} from "react-native-flash-message";
import Checkout from "./../src/containers/cart/Checkout";

export default class CheckoutScreen extends React.Component {

    static navigationOptions = {
        title: 'Оплата и доставка',
    };
    //
    // showAddToCartMessage = () => {
    //     showMessage({
    //         message: "Товар добавлен в корзину",
    //         type: "default",
    //     });
    // };

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Checkout navigation={navigation}/>
                {/*<FlashMessage position="top"/>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
