import React from 'react';
import CartItemsList from '../src/containers/cart/CartItemsList';
import {StyleSheet, View} from 'react-native';

export default class CartScreen extends React.Component {
  static navigationOptions = {
    title: 'Корзина',
  };


  render() {
    return <View style={styles.container}>
      <CartItemsList navigation={this.props.navigation}/>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
