import React from 'react';
import {View} from 'react-native';
import ProductList from '../src/containers/product/ProductList';
import {_retrieveConfig, _styles, nestedAssign} from "../src/constants/SettingsManager";
import CenteredLoadingIdicator from '../src/components/core/CenteredLoadingIdicator';

export default class HomeScreen extends React.Component {

  state = {
    clientStyle: ''
  };

  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      title: params ? params.screenTitle : '',
    }
  };

  async componentDidMount() {
    const config = await _retrieveConfig();
    this.props.navigation.setParams({screenTitle: config[this.constructor.name].translations.title});
    this.setState({clientStyle: config[this.constructor.name].style});
  }


  render() {
    if (this.state.clientStyle) {
      const styles = _styles(style, this.state.clientStyle);
      return (
          <View style={styles.homeScreenContainer}>
            <ProductList navigation={this.props.navigation}/>
          </View>
      )
    } else {
      return <CenteredLoadingIdicator/>
    }

  }
}



const style = {
  homeScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  }
};
