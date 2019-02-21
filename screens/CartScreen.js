import React from 'react';
import CartItemsList from '../src/containers/cart/CartItemsList';

export default class CartScreen extends React.Component {
  static navigationOptions = {
    // title: 'app.json',
  };

  render() {
    return <CartItemsList/>;
  }
}
