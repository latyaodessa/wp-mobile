import React from 'react';
import {StyleSheet, View} from 'react-native';
import SearchProductList from '../src/containers/product/SearchProductList';

export default class SearchCatergoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Категории товаров',
  };


  render() {
    return (
        <View style={styles.container}>
          <SearchProductList navigation={this.props.navigation}/>
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
