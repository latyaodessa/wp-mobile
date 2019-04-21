import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {connect} from "react-redux";
import UserOrderItemsList from "../src/containers/user/UserOrderItemsList";

class UserOrderItemsScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Товары заказа'
    }
  };

  constructor() {
    super();

  }

  render() {
    const {navigation} = this.props;
    const item = navigation.getParam('item', null);
    return (
        <ScrollView style={styles.container}>
        <UserOrderItemsList item={item} navigation={navigation}/>
        </ScrollView>
    );
  }
}

export default connect()(UserOrderItemsScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  }
});
