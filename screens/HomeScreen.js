import React from 'react';
import {StyleSheet, View} from 'react-native';
import ProductList from '../src/containers/product/ProductList';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Products',
  };


  render() {
    return (
        <View style={styles.container}>
          <ProductList navigation={this.props.navigation}/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
